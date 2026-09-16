<script setup>
/* ---- Work: replace with real projects and releases ---- */
const work = [
  { type: 'Release', title: 'Project title one', meta: 'Album · 2025', note: 'Placeholder' },
  { type: 'Release', title: 'Project title two', meta: 'Single · 2025', note: 'Placeholder' },
  { type: 'Session', title: 'Project title three', meta: 'Drums · 2024', note: 'Placeholder' },
  { type: 'Score', title: 'Project title four', meta: 'Film · 2024', note: 'Placeholder' },
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
            Songs, sessions,<br />
            <em>sound design.</em>
          </h1>
          <p class="lede">
            Placeholder copy — describe the instruments you play, the rooms you record in, and
            the kind of collaboration you take on.
          </p>
          <div class="mus-hero__actions">
            <a class="btn btn--solid" href="#work">Hear the music</a>
            <a class="btn" :href="links.instagram" target="_blank" rel="noopener">Instagram ↗</a>
          </div>
        </div>

        <figure class="mus-hero__avatar">
          <img src="/images/musician.jpg" alt="Mattias before a concert" />
          <figcaption>Mattias Hagström</figcaption>
        </figure>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section mus-work">
      <div class="shell">
        <p class="eyebrow">01 — Selected work</p>
        <h2 class="section-title">Records and releases.</h2>

        <iframe
          class="mus-embed"
          title="Spotify playlist"
          src="https://open.spotify.com/embed/playlist/7IglWfa9LnihddunNv0cYS?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameborder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <div class="work__grid">
          <article v-for="item in work" :key="item.title" class="card">
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

.mus-embed {
  display: block;
  margin-top: 2.75rem;
  border-radius: var(--radius);
}

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
  background: radial-gradient(90% 90% at 30% 20%, rgba(245, 181, 68, 0.22), transparent 70%),
    var(--ink-700);
  transition: transform 0.35s var(--ease);
}

.card:hover .card__thumb {
  transform: translateY(-4px);
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
