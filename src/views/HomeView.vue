<script setup>
import { RouterLink } from 'vue-router'
import SplitReveal from '@/components/SplitReveal.vue'

/* ---- Hero: swap the two `image` paths for your own photos ---- */
const musician = {
  image: '/images/musician.jpg',
  alt: 'Picture of Mattias before a concert',
  label: 'Musician',
  line: 'Drummer, songwriter and producer.',
  cta: 'Hear the music',
  href: '/musician'
}

const developer = {
  image: '/images/developer.png',
  alt: 'Mattias as pixelart',
  label: 'Developer',
  line: 'Software developer building fullstack applications.',
  cta: 'See the work',
  href: '/developer'
}

const crafts = [
  {
    tone: 'warm',
    kicker: 'Music',
    to: '/musician',
    title: 'Songs, sessions, sound design',
    body:
      'Placeholder copy — describe the instruments you play, the rooms you record in, and the kind of collaboration you take on.',
    points: ['Writing & arranging', 'Recording & mixing', 'Session work', 'Live performance'],
  },
  {
    tone: 'cool',
    kicker: 'Code',
    to: '/developer',
    title: 'Products, platforms, tooling',
    body:
      'Placeholder copy — describe your stack, the systems you have shipped, and the kind of engagements you are open to.',
    points: ['Full-stack web', 'APIs & data', 'Developer tooling', 'Technical direction'],
  },
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
          <RouterLink class="btn btn--solid" to="/musician">Hear the music</RouterLink>
          <RouterLink class="btn" to="/developer">See the code</RouterLink>
        </div>
      </div>
    </section>

    <!-- Crafts -->
    <section id="crafts" class="section crafts">
      <div class="shell crafts__grid">
        <RouterLink
          v-for="craft in crafts"
          :key="craft.kicker"
          :to="craft.to"
          class="craft"
          :data-tone="craft.tone"
        >
          <p class="craft__kicker">{{ craft.kicker }}</p>
          <h3 class="craft__title">{{ craft.title }}</h3>
          <p class="craft__body">{{ craft.body }}</p>
          <ul class="craft__points">
            <li v-for="point in craft.points" :key="point">{{ point }}</li>
          </ul>
          <span class="craft__arrow" aria-hidden="true">↗</span>
        </RouterLink>
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
  display: block;
  padding: clamp(1.6rem, 3vw, 2.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 60%);
  overflow: hidden;
  transition: border-color 0.25s var(--ease), transform 0.35s var(--ease);
}

.craft:hover {
  border-color: var(--line-strong);
  transform: translateY(-4px);
}

.craft__arrow {
  position: absolute;
  top: clamp(1.4rem, 3vw, 2.2rem);
  right: clamp(1.4rem, 3vw, 2.2rem);
  color: var(--text-faint);
  font-size: 1.1rem;
  transition: color 0.2s var(--ease), transform 0.25s var(--ease);
}

.craft:hover .craft__arrow {
  color: var(--text);
  transform: translate(2px, -2px);
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
