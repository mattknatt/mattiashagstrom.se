<script setup>
import SplitReveal from '@/components/SplitReveal.vue'

/* ---- Hero: swap the two `image` paths for your own photos ---- */
const musician = {
  image: '/images/musician.jpg',
  alt: 'Picture of Mattias before a concert',
  label: 'Musician',
  line: 'Drummer, songwriter and producer.',
  cta: 'Hear the music',
  href: '#work'
}

const developer = {
  image: '/images/developer.png',
  alt: 'Mattias as pixelart',
  label: 'Developer',
  line: 'Software developer building fullstack applications.',
  cta: 'See the work',
  href: '#work'
}

const crafts = [
  {
    tone: 'warm',
    kicker: 'Music',
    title: 'Songs, sessions, sound design',
    body:
      'Placeholder copy — describe the instruments you play, the rooms you record in, and the kind of collaboration you take on.',
    points: ['Writing & arranging', 'Recording & mixing', 'Session work', 'Live performance'],
  },
  {
    tone: 'cool',
    kicker: 'Code',
    title: 'Products, platforms, tooling',
    body:
      'Placeholder copy — describe your stack, the systems you have shipped, and the kind of engagements you are open to.',
    points: ['Full-stack web', 'APIs & data', 'Developer tooling', 'Technical direction'],
  },
]

/* ---- Work: replace with real projects and releases ---- */
const work = [
  { tone: 'warm', type: 'Release', title: 'Project title one', meta: 'Album · 2025', note: 'Placeholder' },
  { tone: 'cool', type: 'Product', title: 'Project title two', meta: 'Web app · 2025', note: 'Placeholder' },
  { tone: 'cool', type: 'Open source', title: 'Project title three', meta: 'Library · 2024', note: 'Placeholder' },
  { tone: 'warm', type: 'Score', title: 'Project title four', meta: 'Film · 2024', note: 'Placeholder' },
]
</script>

<template>
  <main>
    <SplitReveal
      name="Mattias Hagström"
      kicker="musician & developer"
      :musician="musician"
      :developer="developer"
      :start="50"
    />

    <!-- Strapline -->
    <section class="section intro">
      <div class="shell">
        <p class="eyebrow">The short version</p>
        <h2 class="section-title">
          Two crafts that keep<br />
          borrowing from each other.
        </h2>
        <p class="lede">
          Placeholder copy — a sentence or two about how you move between writing software and
          writing music, and what somebody landing here should do next.
        </p>
        <div class="intro__actions">
          <a class="btn btn--solid" href="#work">See selected work</a>
          <a class="btn" href="#contact">Start a conversation</a>
        </div>
      </div>
    </section>

    <!-- Crafts -->
    <section id="crafts" class="section crafts">
      <div class="shell crafts__grid">
        <article v-for="craft in crafts" :key="craft.kicker" class="craft" :data-tone="craft.tone">
          <p class="craft__kicker">{{ craft.kicker }}</p>
          <h3 class="craft__title">{{ craft.title }}</h3>
          <p class="craft__body">{{ craft.body }}</p>
          <ul class="craft__points">
            <li v-for="point in craft.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section work">
      <div class="shell">
        <p class="eyebrow">Selected work</p>
        <h2 class="section-title">Records and releases.</h2>

        <iframe data-testid="embed-iframe" style="border-radius:12px"
         src="https://open.spotify.com/embed/playlist/7IglWfa9LnihddunNv0cYS?utm_source=generator&theme=0&si=9ddf05d9256e4c65"
          width="100%" height="352" frameBorder="0" allowfullscreen=""
           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
          </iframe>
        <div class="work__grid">
          <article v-for="item in work" :key="item.title" class="card" :data-tone="item.tone">
            <div class="card__thumb">
              <span class="card__thumb-note">{{ item.note }}</span>
            </div>
            <p class="card__type">{{ item.type }}</p>
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__meta">{{ item.meta }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section contact">
      <div class="shell contact__inner">
        <p class="eyebrow">Contact</p>
        <h2 class="section-title">Got a project, a track,<br />or something in between?</h2>
        <p class="lede">Placeholder copy — say what you want people to reach out about.</p>
        <a class="btn btn--solid contact__btn" href="mailto:hello@mattiashagstrom.se">
          hello@mattiashagstrom.se
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ---------- intro ---------- */
.intro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

/* ---------- crafts ---------- */
.crafts {
  padding-top: 0;
}

.crafts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.craft {
  position: relative;
  padding: clamp(1.6rem, 3vw, 2.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 60%);
  overflow: hidden;
}

.craft::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
}

.craft[data-tone='warm']::before {
  background: linear-gradient(90deg, var(--warm-1), transparent);
}

.craft[data-tone='cool']::before {
  background: linear-gradient(90deg, var(--cool-1), transparent);
}

.craft__kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.craft[data-tone='warm'] .craft__kicker {
  color: var(--warm-1);
}

.craft[data-tone='cool'] .craft__kicker {
  color: var(--cool-1);
}

.craft__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.15;
  margin-top: 0.6rem;
}

.craft__body {
  margin-top: 0.9rem;
  color: var(--text-dim);
  font-size: 0.98rem;
}

.craft__points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.craft__points li {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 100px;
  font-size: 0.78rem;
  color: var(--text-dim);
}

/* ---------- work ---------- */
.work__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem 1.25rem;
  margin-top: 2.75rem;
}

.card__thumb {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
  border: 1px dashed var(--line-strong);
  margin-bottom: 1rem;
  transition: transform 0.35s var(--ease);
}

.card:hover .card__thumb {
  transform: translateY(-4px);
}

.card[data-tone='warm'] .card__thumb {
  background: radial-gradient(90% 90% at 30% 20%, rgba(245, 181, 68, 0.22), transparent 70%),
    var(--ink-700);
}

.card[data-tone='cool'] .card__thumb {
  background: radial-gradient(90% 90% at 70% 20%, rgba(99, 211, 232, 0.2), transparent 70%),
    var(--ink-700);
}

.card__thumb-note {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.card__type {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.card__title {
  font-size: 1.05rem;
  font-weight: 500;
  margin-top: 0.35rem;
}

.card__meta {
  font-size: 0.85rem;
  color: var(--text-dim);
}

/* ---------- contact ---------- */
.contact {
  border-top: 1px solid var(--line);
}

.contact__inner {
  text-align: center;
}

.contact__inner .lede {
  margin-inline: auto;
}

.contact__btn {
  margin-top: 2rem;
  font-family: var(--font-mono);
}
</style>
