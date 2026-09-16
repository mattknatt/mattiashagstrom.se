<script setup>
import { RouterLink } from 'vue-router'
import SplitReveal from '@/components/SplitReveal.vue'

/* ---- Hero: swap the two `image` paths for your own photos ---- */
const base = import.meta.env.BASE_URL

const musician = {
  image: base + 'images/musician.jpg',
  alt: 'Picture of Mattias before a concert',
  label: 'Musician',
  line: 'Drummer, songwriter and producer.',
  cta: 'Hear the music',
  href: '/musician'
}

const developer = {
  image: base + 'images/developer.png',
  alt: 'Mattias as pixelart',
  label: 'Developer',
  line: 'Software developer building fullstack applications.',
  cta: 'See the work',
  href: '/developer'
}
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
        <p class="eyebrow">About me</p>
        <h2 class="section-title">
          Making music, <br />
          building software. 
        </h2>
        <p class="lede">
          I like to create things with good people, whether that means making music or building software. Here's some of what I've been working on. 
        </p>
        <div class="intro__actions">
          <RouterLink class="btn btn--solid" to="/musician">Hear the music</RouterLink>
          <RouterLink class="btn" to="/developer">See the code</RouterLink>
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
