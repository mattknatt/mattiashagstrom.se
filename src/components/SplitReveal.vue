<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  name: { type: String, default: 'Mattias Hagström' },
  kicker: { type: String, default: 'developer & musician' },
  musician: { type: Object, required: true },
  developer: { type: Object, required: true },
  /** Opening divider position, 0 = all developer, 100 = all musician. */
  start: { type: Number, default: 50 },
})

/* Placeholder hints render during `npm run dev` only, never in a build. */
const showNotes = import.meta.env.DEV

const pos = ref(props.start)
const dragging = ref(false)
const stage = ref(null)

const clamp = (n) => Math.min(100, Math.max(0, n))

/* ---------- animation ---------- */
let raf = 0
let introTimer = 0
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tweenTo(target, duration = 620, done) {
  cancelAnimationFrame(raf)
  if (reducedMotion) {
    pos.value = target
    done?.()
    return
  }
  const from = pos.value
  const t0 = performance.now()
  const frame = (now) => {
    const t = Math.min(1, (now - t0) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    pos.value = from + (target - from) * eased
    if (t < 1) raf = requestAnimationFrame(frame)
    else done?.()
  }
  raf = requestAnimationFrame(frame)
}

/** One gentle sweep on load so the drag affordance is discoverable. */
function playHint() {
  introTimer = window.setTimeout(() => {
    tweenTo(66, 780, () => tweenTo(props.start, 900))
  }, 900)
}

function stopHint() {
  window.clearTimeout(introTimer)
  cancelAnimationFrame(raf)
}

/* ---------- pointer ---------- */
function posFromEvent(event) {
  const rect = stage.value.getBoundingClientRect()
  return clamp(((event.clientX - rect.left) / rect.width) * 100)
}

function onPointerDown(event) {
  // Never start a drag from one of the side links. Capturing the pointer would
  // send the pointerup to the stage and the click would never reach the anchor,
  // and jumping the divider here would fade that link out from under the cursor.
  // The handle is deliberately not excluded — dragging it is the whole point.
  if (event.target.closest('a')) return

  stopHint()
  dragging.value = true
  pos.value = posFromEvent(event)
  // Capturing keeps the drag alive if the cursor leaves the stage. It can throw
  // for a pointer that is no longer active, which is harmless here.
  try {
    stage.value.setPointerCapture(event.pointerId)
  } catch {
    /* no capture available — the drag still works inside the stage */
  }
}

function onPointerMove(event) {
  if (!dragging.value) return
  event.preventDefault()
  pos.value = posFromEvent(event)
}

function onPointerUp(event) {
  if (!dragging.value) return
  // Commit where the pointer was actually released, not the last sampled move.
  pos.value = posFromEvent(event)
  dragging.value = false
  try {
    stage.value.releasePointerCapture(event.pointerId)
  } catch {
    /* nothing was captured */
  }
}

/* ---------- keyboard ---------- */
function onKeydown(event) {
  const step = event.shiftKey ? 10 : 2
  const moves = {
    ArrowLeft: -step,
    ArrowDown: -step,
    ArrowRight: step,
    ArrowUp: step,
  }
  if (event.key in moves) {
    stopHint()
    pos.value = clamp(pos.value + moves[event.key])
  } else if (event.key === 'Home') {
    stopHint()
    tweenTo(0)
  } else if (event.key === 'End') {
    stopHint()
    tweenTo(100)
  } else {
    return
  }
  event.preventDefault()
}

function snapTo(target) {
  stopHint()
  tweenTo(target, 700)
}

/* ---------- copy fade ----------
   Each side's body copy fades out as the divider closes in on it, so the text
   is never sliced mid-word. Only the centred name is meant to be cut. */
const track = (v) => Math.min(1, Math.max(0, v))
const musicianCopy = computed(() => {
  const o = track((pos.value - 28) / 20)
  return { opacity: o, pointerEvents: o > 0.6 ? 'auto' : 'none' }
})
const developerCopy = computed(() => {
  const o = track((72 - pos.value) / 20)
  return { opacity: o, pointerEvents: o > 0.6 ? 'auto' : 'none' }
})

/* ---------- a11y labels ---------- */
const valueText = computed(() => {
  if (pos.value >= 92) return 'Musician'
  if (pos.value <= 8) return 'Developer'
  return 'Both — musician and developer'
})

onMounted(() => {
  if (!reducedMotion) playHint()
})

onBeforeUnmount(stopHint)
</script>

<template>
  <section class="reveal" :style="{ '--pos': pos + '%' }" aria-labelledby="reveal-name">
    <div
      ref="stage"
      class="stage"
      :class="{ 'is-dragging': dragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- Base layer: musician (revealed by pulling right) -->
      <div class="panel panel--musician">
        <img
          class="panel__img"
          :src="musician.image"
          :alt="musician.alt"
          draggable="false"
          @dragstart.prevent
        />
        <div class="panel__scrim"></div>

        <div class="center">
          <p class="center__kicker">{{ kicker }}</p>
          <h1 id="reveal-name" class="center__name">{{ name }}</h1>
        </div>

        <div class="copy copy--left" :style="{ opacity: musicianCopy.opacity }">
          <p v-if="showNotes && musician.note" class="copy__note">{{ musician.note }}</p>
          <p class="copy__label">{{ musician.label }}</p>
          <p class="copy__line">{{ musician.line }}</p>
          <a class="copy__link" :href="musician.href" :style="{ pointerEvents: musicianCopy.pointerEvents }">{{ musician.cta }}</a>
        </div>
      </div>

      <!-- Overlay layer: developer, clipped away as the divider moves right -->
      <div class="panel panel--developer">
        <img
          class="panel__img"
          :src="developer.image"
          :alt="developer.alt"
          draggable="false"
          @dragstart.prevent
        />
        <div class="panel__scrim"></div>

        <div class="center" aria-hidden="true">
          <p class="center__kicker">{{ kicker }}</p>
          <p class="center__name">{{ name }}</p>
        </div>

        <div class="copy copy--right" :style="{ opacity: developerCopy.opacity }">
          <p v-if="showNotes && developer.note" class="copy__note">{{ developer.note }}</p>
          <p class="copy__label">{{ developer.label }}</p>
          <p class="copy__line">{{ developer.line }}</p>
          <a class="copy__link" :href="developer.href" :style="{ pointerEvents: developerCopy.pointerEvents }">{{ developer.cta }}</a>
        </div>
      </div>

      <!-- Divider -->
      <div class="seam" aria-hidden="true"></div>

      <button
        type="button"
        class="handle"
        role="slider"
        aria-label="Drag to reveal the musician or the developer"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(pos)"
        :aria-valuetext="valueText"
        @keydown="onKeydown"
      >
        <span class="handle__ring">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="M9.5 7.5 5 12l4.5 4.5M14.5 7.5 19 12l-4.5 4.5"
              stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="handle__hint">drag</span>
      </button>
    </div>

    <div class="controls">
      <button type="button" class="controls__btn controls__btn--dev" @click="snapTo(0)">
        Show the developer
      </button>
      <button type="button" class="controls__btn" @click="snapTo(50)">Both</button>
      <button type="button" class="controls__btn controls__btn--mus" @click="snapTo(100)">
        Show the musician
      </button>
    </div>
  </section>
</template>

<style scoped>
.reveal {
  --seam-w: 2px;
  position: relative;
}

.stage {
  position: relative;
  height: clamp(520px, 82vh, 880px);
  overflow: hidden;
  background: var(--ink-800);
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

/* ---------- panels ---------- */
.panel {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* The developer panel sits on top and is clipped from the left edge inward. */
.panel--developer {
  clip-path: inset(0 0 0 var(--pos));
}

.panel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.panel__scrim {
  position: absolute;
  inset: 0;
}

.panel--musician .panel__scrim {
  background:
    radial-gradient(120% 90% at 22% 30%, var(--warm-glow), transparent 60%),
    linear-gradient(to top, rgba(8, 8, 11, 0.92) 0%, rgba(8, 8, 11, 0.34) 46%, rgba(8, 8, 11, 0.62) 100%);
}

.panel--developer .panel__scrim {
  background:
    radial-gradient(120% 90% at 78% 30%, var(--cool-glow), transparent 60%),
    linear-gradient(to top, rgba(8, 8, 11, 0.92) 0%, rgba(8, 8, 11, 0.34) 46%, rgba(8, 8, 11, 0.62) 100%);
}

/* ---------- sliced centrepiece ----------
   Identical geometry in both panels, so the divider cuts the name in two. */
.center {
  position: absolute;
  top: clamp(3.5rem, 12vh, 7.5rem);
  left: 50%;
  width: min(100%, 1100px);
  transform: translateX(-50%);
  padding-inline: var(--pad-page);
  text-align: center;
  pointer-events: none;
}

.center__kicker {
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1.4vw, 0.8rem);
  letter-spacing: 0.34em;
  text-transform: uppercase;
  margin-bottom: 0.9rem;
}

.center__name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.6rem, 9vw, 7rem);
  line-height: 0.98;
  letter-spacing: -0.02em;
  white-space: nowrap;
}


.panel--musician .center__kicker {
  color: rgba(245, 181, 68, 0.9);
}

.panel--musician .center__name {
  color: #fff6e6;
  text-shadow: 0 0 44px rgba(245, 181, 68, 0.4);
}

.panel--developer .center__kicker {
  color: rgba(99, 211, 232, 0.9);
}

.panel--developer .center__name {
  color: #eaf7ff;
  text-shadow: 0 0 44px rgba(99, 211, 232, 0.36);
}

/* ---------- per-side copy ---------- */
.copy {
  position: absolute;
  bottom: clamp(4.5rem, 11vh, 7rem);
  width: min(34ch, 40%);
  pointer-events: none;
  transition: opacity 0.12s linear;
}

.copy--left {
  left: var(--pad-page);
}

.copy--right {
  right: var(--pad-page);
  text-align: right;
}

.copy__note {
  display: inline-block;
  margin-bottom: 0.85rem;
  padding: 0.3rem 0.7rem;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.35);
}

.copy__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.panel--musician .copy__label {
  color: var(--warm-1);
}

.panel--developer .copy__label {
  color: var(--cool-1);
}

.copy__line {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.84);
}

.copy__link {
  display: inline-block;
  margin-top: 1rem;
  padding-bottom: 2px;
  font-size: 0.86rem;
  font-weight: 500;
  border-bottom: 1px solid currentColor;
  pointer-events: auto;
  transition: opacity 0.2s var(--ease);
}

.copy__link:hover {
  opacity: 0.7;
}

.panel--musician .copy__link {
  color: var(--warm-1);
}

.panel--developer .copy__link {
  color: var(--cool-1);
}

/* ---------- divider ---------- */
.seam {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--pos);
  width: var(--seam-w);
  margin-left: calc(var(--seam-w) / -2);
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.9) 12%,
    rgba(255, 255, 255, 0.9) 88%,
    transparent
  );
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.45);
  pointer-events: none;
}

.handle {
  position: absolute;
  top: 50%;
  left: var(--pos);
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  gap: 0.6rem;
  cursor: ew-resize;
  touch-action: none;
}

.handle__ring {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  color: var(--ink-900);
  background: rgba(255, 255, 255, 0.94);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 10px 34px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  transition: transform 0.25s var(--ease), background-color 0.25s var(--ease);
}

.handle:hover .handle__ring {
  transform: scale(1.08);
  background: #fff;
}

.stage.is-dragging .handle__ring {
  transform: scale(0.94);
}

.handle__hint {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.8);
  transition: opacity 0.25s var(--ease);
}

.stage.is-dragging .handle__hint {
  opacity: 0;
}

/* ---------- controls under the stage ---------- */
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.15rem var(--pad-page) 0;
}

.controls__btn {
  padding: 0.5rem 1.05rem;
  border-radius: 100px;
  border: 1px solid var(--line);
  font-size: 0.8rem;
  color: var(--text-dim);
  transition: color 0.22s var(--ease), border-color 0.22s var(--ease),
    background-color 0.22s var(--ease);
}

.controls__btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.controls__btn--mus:hover {
  color: var(--warm-1);
  border-color: rgba(245, 181, 68, 0.5);
}

.controls__btn--dev:hover {
  color: var(--cool-1);
  border-color: rgba(99, 211, 232, 0.5);
}

/* ---------- narrow screens ----------
   Stack the two copy blocks vertically so they never collide at the divider. */
@media (max-width: 720px) {
  .stage {
    height: clamp(560px, 88vh, 760px);
    cursor: default;
  }

  .copy {
    width: min(24ch, 44%);
  }

  .copy--left {
    bottom: clamp(7.5rem, 22vh, 11rem);
  }

  .copy--right {
    bottom: clamp(3.5rem, 9vh, 5rem);
  }

  .center__name {
    white-space: normal;
  }

  .handle__ring {
    width: 54px;
    height: 54px;
  }
}
</style>
