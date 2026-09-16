<script setup>
import AlbumCarousel from '@/components/AlbumCarousel.vue'

/* ---- Releases I've played on: iTunes collection ids, in carousel order ---- */
const albumIds = [
  1676516887, // Sarah Klang – Mercedes
  1548945650, // Sarah Klang – Virgo
  1327296883, // Sarah Klang – Love In the Milky Way
  1479204251, // Sarah Klang – Creamy Blue
  1877064213, // Eah Jé – Konsten att leva
  1761586920, // Ludwig Hart – Stay Young
  1596896600, // Harpo – Stark & sårbar (Så mycket bättre 2021)
  1539189367, // Isak Danielson – Almost Heaven
  1756750172, // Isak Danielson – Truly Yours, Isak
  6785929630, // sixten – Misemotional
  1713900413, // Simon Russell – Art By You
  1466596358, // mimi bay – Really
  1820934086, // mimi bay – big bite mixtape
  1784175994, // Citizend – The Spiral
]

const links = {
  spotify: 'https://open.spotify.com/playlist/7IglWfa9LnihddunNv0cYS?si=db81c3d46fec49bd',
  instagram: 'https://instagram.com/mattiashagstrommusic',
}
</script>

<template>
  <main class="mus">
    <!-- Hero -->
    <section class="section mus-hero">
      <div class="shell mus-hero__grid">
        <div>
          <p class="eyebrow mus-hero__eyebrow">
            <span class="mus-hero__dot" aria-hidden="true"></span>
            Drummer · songwriter · producer
          </p>
          <h1 class="section-title">
            Live, sessions,<br />
            <em>production.</em>
          </h1>
          <p class="lede">
            I do recordings and production from my studio in Gothenburg, as well as live shows and touring.
          </p>
          <div class="mus-hero__actions">
            <a class="btn btn--solid" href="#work">Hear the music</a>
            <a class="btn" :href="links.instagram" target="_blank" rel="noopener">Instagram ↗</a>
          </div>
        </div>

        <figure class="mus-hero__avatar">
          <img src="/images/musician-avatar.jpg" alt="Mattias before a concert" width="800" height="800" />
          <figcaption>Mattias Hagström</figcaption>
        </figure>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section mus-work">
      <div class="shell">
        <p class="eyebrow">01 — Selected work</p>
        <h2 class="section-title">Records and releases.</h2>
        <p class="lede">Records I've played on. Drag to spin, click a cover to open it.</p>

        <AlbumCarousel class="mus-carousel" :ids="albumIds" />

        <iframe
          class="mus-embed"
          title="Spotify playlist"
          src="https://open.spotify.com/embed/playlist/7IglWfa9LnihddunNv0cYS"
          width="100%"
          height="352"
          frameborder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section mus-contact">
      <div class="shell">
        <div class="contact-card">
          <div>
            <h2 class="contact-card__title">Got a track in mind?</h2>
            <p class="contact-card__text">Open to sessions, co-writes, production and live work.</p>
          </div>
          <div class="contact-card__actions">
            <a class="btn" :href="links.spotify" target="_blank" rel="noopener">Spotify ↗</a>
            <a class="btn btn--solid" href="mailto:hello@mattiashagstrom.se">Email me</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ---------- hero ---------- */
.mus-hero {
  padding-top: calc(var(--gap-section) + 4rem);
  background:
    radial-gradient(60% 50% at 80% 10%, var(--warm-glow), transparent 70%),
    transparent;
}

.mus-hero__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
}

.mus-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--warm-1);
}

.mus-hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--warm-1);
  box-shadow: 0 0 12px var(--warm-glow);
}

.mus-hero .section-title {
  font-size: clamp(2.8rem, 7vw, 5rem);
}

.mus-hero .section-title em {
  font-style: italic;
  color: var(--text-dim);
}

.mus-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.mus-hero__avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.mus-hero__avatar img {
  width: 200px;
  height: 200px;
  border-radius: var(--radius);
  object-fit: cover;
  border: 1px solid var(--line);
  box-shadow: 0 0 60px var(--warm-glow);
}

.mus-hero__avatar figcaption {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ---------- work ---------- */
.mus-work {
  border-top: 1px solid var(--line);
}

.mus-carousel {
  margin-top: 2.5rem;
}

.mus-embed {
  display: block;
  margin-top: 3.5rem;
  border-radius: var(--radius);
}


/* ---------- contact ---------- */
.contact-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: clamp(2rem, 4vw, 3rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background:
    radial-gradient(70% 90% at 0% 0%, rgba(245, 181, 68, 0.12), transparent 70%),
    var(--ink-800);
}

.contact-card__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  line-height: 1.1;
}

.contact-card__text {
  margin-top: 0.5rem;
  color: var(--text-dim);
  font-size: 0.95rem;
}

.contact-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* ---------- responsive ---------- */
@media (max-width: 720px) {
  .mus-hero__grid {
    grid-template-columns: 1fr;
  }

  .mus-hero__avatar {
    display: none;
  }
}
</style>
