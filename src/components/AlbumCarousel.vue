<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  /** iTunes collection ids, in display order. */
  ids: { type: Array, required: true },
  /** Seconds for one full revolution when idle. */
  period: { type: Number, default: 98 },
})

const albums = ref([])
const failed = ref(false)

/* ---------- data ----------
   One lookup call for every id; the result is cached per tab so route changes
   don't hit the API again. */
const CACHE_KEY = 'itunes-albums:' + props.ids.join(',')

async function load() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      albums.value = JSON.parse(cached)
      return
    }
  } catch {
    /* storage unavailable — fall through to fetch */
  }

  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${props.ids.join(',')}&country=se`)
    if (!res.ok) throw new Error(res.statusText)
    const { results } = await res.json()
    const byId = new Map(results.map((r) => [r.collectionId, r]))
    albums.value = props.ids
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((r) => ({
        id: r.collectionId,
        title: r.collectionName.replace(/ - (Single|EP)$/, ''),
        artist: r.artistName,
        year: (r.releaseDate || '').slice(0, 4),
        art: r.artworkUrl100.replace('100x100bb', '600x600bb'),
        url: r.collectionViewUrl,
      }))
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(albums.value))
    } catch {
      /* ignore */
    }
  } catch {
    failed.value = true
  }
}

/* ---------- geometry ----------
   Covers sit on a ring; the radius is whatever makes n covers of width w touch
   edge to edge (plus a little breathing room). */
const stage = ref(null)
const coverWidth = ref(200)
const count = computed(() => albums.value.length)
const step = computed(() => (count.value ? 360 / count.value : 0))
const radius = computed(() =>
  count.value > 1 ? (coverWidth.value * 1.05) / 2 / Math.tan(Math.PI / count.value) : 0,
)

function measure() {
  if (!stage.value) return
  const v = getComputedStyle(stage.value).getPropertyValue('--cover-w')
  coverWidth.value = parseFloat(v) || 200
}

/* ---------- motion ----------
   `angle` is the ring's rotation. It drifts on its own and can be dragged; the
   drift picks up again once the pointer lets go. */
const angle = ref(0)
const dragging = ref(false)
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let raf = 0
let last = 0
let velocity = 0
let idle = !reducedMotion
let pointerStartX = 0
let angleStart = 0
let moved = 0

function frame(now) {
  const dt = Math.min(64, now - last) / 1000
  last = now
  if (!dragging.value) {
    if (Math.abs(velocity) > 2) {
      angle.value += velocity * dt
      velocity *= 0.94
    } else if (idle) {
      angle.value -= (360 / props.period) * dt
    }
  }
  raf = requestAnimationFrame(frame)
}

function onPointerDown(e) {
  dragging.value = true
  moved = 0
  velocity = 0
  pointerStartX = e.clientX
  angleStart = angle.value
  e.currentTarget.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging.value) return
  const dx = e.clientX - pointerStartX
  moved = Math.max(moved, Math.abs(dx))
  const next = angleStart + dx * 0.35
  velocity = (next - angle.value) * 30
  angle.value = next
}

function onPointerUp() {
  dragging.value = false
}

/* A drag shouldn't also count as a click on the cover underneath. */
function onCoverClick(e) {
  if (moved > 6) e.preventDefault()
}

/* ---------- per-cover state ---------- */
function coverStyle(i) {
  return {
    transform: `rotateY(${i * step.value}deg) translateZ(${radius.value}px)`,
  }
}

/* How close each cover is to facing the viewer, 1 = front, -1 = back. */
function facing(i) {
  const a = ((i * step.value + angle.value) * Math.PI) / 180
  return Math.cos(a)
}

const frontIndex = computed(() => {
  if (!count.value) return 0
  const raw = Math.round(-angle.value / step.value)
  return ((raw % count.value) + count.value) % count.value
})

const front = computed(() => albums.value[frontIndex.value])

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
  load()
  last = performance.now()
  raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="carousel" :class="{ 'is-dragging': dragging }">
    <div
      ref="stage"
      class="stage"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @mouseenter="idle = false"
      @mouseleave="idle = !reducedMotion"
    >
      <div class="ring" :style="{ transform: `rotateY(${angle}deg)` }">
        <a
          v-for="(album, i) in albums"
          :key="album.id"
          class="cover"
          :class="{ 'is-front': i === frontIndex }"
          :style="{ ...coverStyle(i), '--facing': facing(i) }"
          :href="album.url"
          target="_blank"
          rel="noopener"
          draggable="false"
          @click="onCoverClick"
        >
          <img :src="album.art" :alt="`${album.title} — ${album.artist}`" loading="lazy" draggable="false" />
        </a>
      </div>
    </div>

    <div class="caption" aria-live="polite">
      <template v-if="front">
        <p class="caption__title">{{ front.title }}</p>
        <p class="caption__meta">{{ front.artist }}<span v-if="front.year"> · {{ front.year }}</span></p>
      </template>
      <p v-else-if="failed" class="caption__meta">Couldn't load album artwork right now.</p>
      <p v-else class="caption__meta">Loading covers…</p>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  --cover-w: 150px;
  user-select: none;
}

.stage {
  position: relative;
  /* Room for the front cover, which perspective scales well past --cover-w. */
  height: calc(var(--cover-w) * 2.1);
  perspective: 1000px;
  perspective-origin: 50% 40%;
  cursor: grab;
  touch-action: pan-y;
  overflow: hidden;
  /* fade the ring's edges into the page */
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.is-dragging .stage {
  cursor: grabbing;
}

.ring {
  position: absolute;
  inset: 0;
  margin: auto;
  width: var(--cover-w);
  height: var(--cover-w);
  transform-style: preserve-3d;
  will-change: transform;
}

.cover {
  position: absolute;
  inset: 0;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--ink-700);
  backface-visibility: hidden;
  /* far side of the ring fades back so the front reads clearly */
  opacity: calc(0.35 + 0.65 * ((var(--facing) + 1) / 2));
  filter: brightness(calc(0.55 + 0.45 * ((var(--facing) + 1) / 2)));
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.8);
  transition: border-color 0.25s var(--ease);
}

.cover.is-front {
  border-color: rgba(245, 181, 68, 0.55);
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.caption {
  min-height: 3.2rem;
  text-align: center;
}

.caption__title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.2;
}

.caption__meta {
  margin-top: 0.15rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-faint);
}

@media (max-width: 720px) {
  .carousel {
    --cover-w: 150px;
  }
}
</style>
