<template>
  <div class="min-h-screen bg-void text-text">
    <header class="sticky top-0 z-50 bg-surface border-b-2 border-rim">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <NuxtLink to="/" class="font-heading text-xs text-gold text-glow-gold">
          Battle Pasta Games
        </NuxtLink>

        <div class="flex items-center gap-10">
          <nav>
            <ul class="flex gap-8 font-heading text-xs text-muted">
              <li><NuxtLink to="/games" class="hover:text-gold transition-colors">Games</NuxtLink></li>
              <li><NuxtLink to="/devlog" class="hover:text-gold transition-colors">Devlog</NuxtLink></li>
              <li><NuxtLink to="/community" class="hover:text-gold transition-colors">Community</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-gold transition-colors">About</NuxtLink></li>
            </ul>
          </nav>

          <!-- Youtube live indicator — placeholder, wire up to Youtube API later -->
          <a href="https://youtube.com" target="_blank" rel="noopener"
             class="flex items-center gap-2 font-heading text-xs text-blood hover:text-neon transition-colors">
            <span class="w-2 h-2 rounded-full bg-blood animate-pulse"></span>
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
