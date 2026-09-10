<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const stuck = ref(false)

function onScroll() {
  stuck.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-header" :class="{ 'is-stuck': stuck }">
    <div class="site-header__inner">
      <RouterLink to="/" class="mark">
        <span class="mark__glyph" aria-hidden="true">MH</span>
        <span class="mark__text">Mattias Hagström</span>
      </RouterLink>

      <nav class="nav" aria-label="Main">
        <a href="#work">Work</a>
        <a href="#crafts">Crafts</a>
        <RouterLink to="/about">About</RouterLink>
        <a href="#contact" class="nav__cta">Get in touch</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  transition: background-color 0.3s var(--ease), border-color 0.3s var(--ease),
    backdrop-filter 0.3s var(--ease);
  border-bottom: 1px solid transparent;
}

.site-header.is-stuck {
  background: rgba(8, 8, 11, 0.72);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  max-width: 1240px;
  margin-inline: auto;
  padding: 1.1rem var(--pad-page);
}

.mark {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.mark__glyph {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid var(--line-strong);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, rgba(245, 181, 68, 0.18), rgba(99, 211, 232, 0.18));
}

.mark__text {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 0.88rem;
}

.nav a {
  color: var(--text-dim);
  transition: color 0.2s var(--ease);
}

.nav a:hover {
  color: var(--text);
}

.nav__cta {
  padding: 0.45rem 1rem;
  border: 1px solid var(--line-strong);
  border-radius: 100px;
  color: var(--text) !important;
}

.nav__cta:hover {
  background: rgba(255, 255, 255, 0.07);
}

@media (max-width: 720px) {
  .mark__text {
    display: none;
  }

  .nav {
    gap: 0.9rem;
    font-size: 0.78rem;
  }

  .nav__cta {
    padding: 0.4rem 0.75rem;
  }
}
</style>
