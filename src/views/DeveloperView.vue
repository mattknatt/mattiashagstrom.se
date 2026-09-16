<script setup>
/* ---- Projects: badge is 'live' | 'code' | 'ai' ---- */
const projects = [
  {
    name: 'boka.',
    badge: 'live',
    href: 'https://boka.fly.dev',
    desc:
      'A high-performance gym class booking app with Google OAuth2, atomic reservations and live availability. Deployed on Fly.io with a Neon serverless Postgres backend and a full CI/CD pipeline via GitHub Actions.',
    tags: ['Spring Boot', 'React 18', 'TypeScript', 'PostgreSQL', 'Docker', 'Fly.io', 'GitHub Actions'],
  },
  {
    name: 'Personal AI Companion',
    badge: 'ai',
    href: 'https://ai-chat-ui-weld-sigma.vercel.app/',
    desc:
      'A full-stack AI chat app with a terminal-inspired UI. Built on a custom Spring Boot middleware layer that manages personalities, per-session conversation memory and resilient retries with exponential backoff. Frontend on Vercel, backend on Fly.io.',
    tags: ['Spring Boot', 'React 19', 'TypeScript', 'Vite', 'OpenRouter', 'Fly.io', 'Vercel'],
  },
  {
    name: 'Triasent',
    badge: 'code',
    href: 'https://github.com/mattknatt/triasent',
    desc:
      'A microservices chat app where users converse with an LLM-backed assistant. Explores real-world OAuth2 / OIDC with Spring Authorization Server, a BFF gateway, an event-driven bot reply path over RabbitMQ with a transactional outbox, and per-user conversation isolation. Deployable via Docker Compose or Kubernetes.',
    tags: ['Spring Boot', 'OAuth2 / OIDC', 'PostgreSQL', 'RabbitMQ', 'gRPC', 'Docker', 'Kubernetes'],
  },
  {
    name: 'myPod',
    badge: 'code',
    href: 'https://github.com/mattknatt/myPod',
    desc:
      'A retro-inspired desktop music player with a custom Click Wheel UI. Integrates the iTunes Search API and persists library data locally via JPA/Hibernate.',
    tags: ['JavaFX', 'Hibernate', 'MySQL', 'Jackson', 'JUnit 5'],
  },
]

const badgeLabel = { live: 'Live', ai: 'Live · AI', code: 'Source' }

const skills = [
  { label: 'Languages', items: ['Java 25', 'TypeScript', 'SQL', 'HTML / CSS'] },
  { label: 'Frameworks', items: ['Spring Boot', 'React 18', 'JavaFX', 'Hibernate / JPA', 'Thymeleaf'] },
  {
    label: 'Tools & databases',
    items: ['MySQL', 'PostgreSQL', 'Docker', 'Maven', 'Fly.io', 'GitHub Actions', 'JUnit 5 / AssertJ', 'Git'],
  },
]
</script>

<template>
  <main class="dev">
    <!-- Hero -->
    <section class="section dev-hero">
      <div class="shell dev-hero__grid">
        <div>
          <p class="eyebrow dev-hero__eyebrow">
            <span class="dev-hero__dot" aria-hidden="true"></span>
            Java developer student · Gothenburg
          </p>
          <h1 class="section-title">
            Backend <em>engineer</em><br />
            in training.
          </h1>
          <p class="lede">
            Studying at <strong>IT-Högskolan</strong>, focused on building systems that are
            reliable under the hood. Passionate about clean architecture, persistent data
            layers, and shipping things that actually work.
          </p>
          <div class="dev-hero__actions">
            <a class="btn btn--solid" href="#projects">View projects</a>
            <a class="btn" href="https://github.com/mattknatt" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>

        <figure class="dev-hero__avatar">
          <img src="/images/developer.png" alt="Mattias as pixel art" />
          <figcaption>Mattias Hagström</figcaption>
        </figure>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="section dev-projects">
      <div class="shell">
        <p class="eyebrow">01 — Projects</p>
        <h2 class="section-title">Things I've built.</h2>

        <div class="projects__grid">
          <a
            v-for="project in projects"
            :key="project.name"
            class="project"
            :href="project.href"
            target="_blank"
            rel="noopener"
          >
            <div class="project__top">
              <span class="project__badge" :data-badge="project.badge">{{ badgeLabel[project.badge] }}</span>
              <span class="project__arrow" aria-hidden="true">↗</span>
            </div>
            <h3 class="project__name">{{ project.name }}</h3>
            <p class="project__desc">{{ project.desc }}</p>
            <ul class="project__tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </a>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="section dev-skills">
      <div class="shell">
        <p class="eyebrow">02 — Skills</p>
        <h2 class="section-title">The toolbox.</h2>

        <div class="skills__grid">
          <article v-for="group in skills" :key="group.label" class="skill-group">
            <p class="skill-group__label">{{ group.label }}</p>
            <ul class="skill-group__list">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="dev-about" class="section dev-about">
      <div class="shell">
        <p class="eyebrow">03 — About</p>
        <h2 class="section-title">Below the surface.</h2>
        <div class="about__text">
          <p>
            I'm a Java developer student based in <strong>Gothenburg, Sweden</strong>, currently
            at IT-Högskolan. My focus is on backend systems — the kind of work that happens below
            the surface.
          </p>
          <p>
            I enjoy designing data models, wiring up repositories, and making sure services talk
            to databases cleanly and reliably. I've contributed to both solo and
            <strong>group projects</strong>, taking ownership of API integrations, persistence
            layers, and system initialization logic.
          </p>
          <p>
            Currently deepening my knowledge of the <strong>Spring ecosystem</strong>, REST API
            design, and clean architecture patterns.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section dev-contact">
      <div class="shell">
        <div class="contact-card">
          <div>
            <h2 class="contact-card__title">Let's work together.</h2>
            <p class="contact-card__text">Open to collaborations, internships, and interesting Java projects.</p>
          </div>
          <div class="contact-card__actions">
            <a class="btn" href="https://github.com/mattknatt" target="_blank" rel="noopener">GitHub ↗</a>
            <a class="btn btn--solid" href="mailto:hello@mattiashagstrom.se">Email me</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dev strong {
  color: var(--text);
  font-weight: 500;
}

/* ---------- hero ---------- */
.dev-hero {
  padding-top: calc(var(--gap-section) + 4rem);
  background:
    radial-gradient(60% 50% at 80% 10%, var(--cool-glow), transparent 70%),
    transparent;
}

.dev-hero__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
}

.dev-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--cool-1);
}

.dev-hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cool-1);
  box-shadow: 0 0 12px var(--cool-glow);
}

.dev-hero .section-title {
  font-size: clamp(2.8rem, 7vw, 5rem);
}

.dev-hero .section-title em {
  font-style: italic;
  color: var(--text-dim);
}

.dev-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.dev-hero__avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.dev-hero__avatar img {
  width: 200px;
  height: 200px;
  border-radius: var(--radius);
  object-fit: cover;
  image-rendering: pixelated;
  border: 1px solid var(--line);
  box-shadow: 0 0 60px var(--cool-glow);
}

.dev-hero__avatar figcaption {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ---------- section rhythm ---------- */
.dev-projects,
.dev-skills,
.dev-about {
  border-top: 1px solid var(--line);
}

/* ---------- projects ---------- */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: 1.25rem;
  margin-top: 2.75rem;
}

.project {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 60%);
  overflow: hidden;
  transition: border-color 0.25s var(--ease), transform 0.35s var(--ease);
}

.project::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cool-1), transparent);
}

.project:hover {
  border-color: var(--line-strong);
  transform: translateY(-4px);
}

.project__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project__badge {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.25rem 0.7rem;
  border-radius: 100px;
  border: 1px solid var(--line);
  color: var(--text-dim);
}

.project__badge[data-badge='live'] {
  color: var(--cool-1);
  border-color: rgba(99, 211, 232, 0.35);
  background: rgba(99, 211, 232, 0.1);
}

.project__badge[data-badge='ai'] {
  color: var(--cool-2);
  border-color: rgba(122, 141, 255, 0.35);
  background: rgba(122, 141, 255, 0.1);
}

.project__arrow {
  color: var(--text-faint);
  font-size: 1.1rem;
  transition: color 0.2s var(--ease), transform 0.25s var(--ease);
}

.project:hover .project__arrow {
  color: var(--text);
  transform: translate(2px, -2px);
}

.project__name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.15;
}

.project__desc {
  flex: 1;
  color: var(--text-dim);
  font-size: 0.95rem;
}

.project__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project__tags li {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 100px;
  font-size: 0.74rem;
  color: var(--text-dim);
}

/* ---------- skills ---------- */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-top: 2.75rem;
}

.skill-group {
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 60%);
}

.skill-group__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cool-1);
  margin-bottom: 1.1rem;
}

.skill-group__list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.skill-group__list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.92rem;
  color: var(--text-dim);
}

.skill-group__list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-faint);
}

/* ---------- about ---------- */
.about__text {
  margin-top: 1.5rem;
  color: var(--text-dim);
  font-size: 0.98rem;
  line-height: 1.8;
  max-width: 72ch;
}

.about__text p + p {
  margin-top: 1rem;
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
    radial-gradient(70% 90% at 0% 0%, rgba(99, 211, 232, 0.12), transparent 70%),
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
  .dev-hero__grid {
    grid-template-columns: 1fr;
  }

  .dev-hero__avatar {
    display: none;
  }
}
</style>
