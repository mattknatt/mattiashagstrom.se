<script setup>
const year = new Date().getFullYear()

const links = [
  { label: 'GitHub', href: '#' },
  { label: 'Spotify', href: '#' },
  { label: 'SoundCloud', href: '#' },
  { label: 'LinkedIn', href: '#' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="shell site-footer__inner">
      <p class="site-footer__mark">Mattias Hagström</p>

      <ul class="site-footer__links">
        <li v-for="link in links" :key="link.label">
          <a :href="link.href">{{ link.label }}</a>
        </li>
      </ul>

      <p class="site-footer__meta">© {{ year }} — built between takes</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 2.5rem;
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.site-footer__mark {
  font-family: var(--font-display);
  font-size: 1.25rem;
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  font-size: 0.86rem;
  color: var(--text-dim);
}

.site-footer__links a:hover {
  color: var(--text);
}

.site-footer__meta {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-faint);
}
</style>
