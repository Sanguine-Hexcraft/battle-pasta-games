<template>
  <div class="min-h-screen bg-void text-text">
    <header class="sticky top-0 z-50 bg-surface border-b-4 border-rim">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <NuxtLink to="/" class="font-heading text-xs text-gold text-glow-gold text-glitch flicker">
          Battle Pasta Games
        </NuxtLink>

        <div class="flex items-center gap-10">
          <nav>
            <ul class="flex gap-8 font-heading text-xs text-muted">
              <li><NuxtLink to="/games"     class="nav-link hover:text-gold transition-colors">Games</NuxtLink></li>
              <li><NuxtLink to="/devlog"    class="nav-link hover:text-gold transition-colors">Devlog</NuxtLink></li>
              <li><NuxtLink to="/community" class="nav-link hover:text-gold transition-colors">Community</NuxtLink></li>
              <li><NuxtLink to="/about"     class="nav-link hover:text-gold transition-colors">About</NuxtLink></li>
            </ul>
          </nav>

          <!-- YouTube live indicator -->
          <a href="https://youtube.com" target="_blank" rel="noopener"
             class="flex items-center gap-2 font-heading text-xs text-blood hover:text-neon transition-colors">
            <span class="w-2 h-2 rounded-full bg-blood" style="animation: blink 0.8s step-end infinite;"></span>
            LIVE
          </a>
        </div>

      </div>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
/* Nav link — > prefix slides in on hover */
.nav-link {
  position: relative;
  padding-left: 0;
  transition: padding-left 120ms ease, color 120ms ease;
}

.nav-link::before {
  content: '>';
  position: absolute;
  left: -14px;
  opacity: 0;
  color: var(--color-gold);
  transition: opacity 120ms ease, left 120ms ease;
}

.nav-link:hover {
  padding-left: 4px;
}

.nav-link:hover::before {
  opacity: 1;
  left: -12px;
}

/* Active route — always show the arrow */
.router-link-active.nav-link {
  color: var(--color-gold);
  padding-left: 4px;
}

.router-link-active.nav-link::before {
  opacity: 1;
  left: -12px;
}
</style>
