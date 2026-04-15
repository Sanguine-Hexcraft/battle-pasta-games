<template>
  <!-- ── Hero ─────────────────────────────────────────────────────────── -->
  <section class="relative min-h-screen flex flex-col items-center justify-center gap-8 px-6 scanlines overflow-hidden">
    <p class="font-heading text-xs text-muted tracking-widest uppercase">Indie Game Studio</p>

    <h1 class="font-heading text-3xl text-gold text-glow-gold text-center leading-loose">
      Battle Pasta<br />Games
    </h1>

    <p class="font-body text-base text-text max-w-md text-center leading-relaxed">
      Dark, weird, handcrafted games. Inspired by the deep cuts — built with love and spite.
    </p>

    <div class="flex gap-4 mt-4">
      <NuxtLink to="/games"
        class="font-heading text-xs text-ink bg-gold px-6 py-3 border-chunky-gold hover:brightness-110 transition-all">
        Explore Games
      </NuxtLink>
      <NuxtLink to="/devlog"
        class="font-heading text-xs text-gold px-6 py-3 border-chunky hover:border-gold transition-all">
        Read Devlog
      </NuxtLink>
    </div>
  </section>

  <!-- ── Featured Game ──────────────────────────────────────────────── -->
  <section class="bg-surface py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <p class="font-heading text-xs text-muted mb-10 tracking-widest uppercase">Featured Game</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-chunky p-8">

        <!-- Art placeholder -->
        <div class="aspect-video bg-surface-2 border-chunky flex items-center justify-center">
          <span class="font-heading text-xs text-muted">[ Game Art ]</span>
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <span class="font-heading text-xs text-neon-cyan">Early Access</span>
            <span class="text-rim">|</span>
            <span class="font-body text-xs text-muted">Roguelike</span>
          </div>

          <h2 class="font-heading text-xl text-text leading-loose">Placeholder<br />Game Title</h2>

          <p class="font-body text-sm text-muted leading-relaxed">
            A short punchy description of the game goes here — genre, tone, what makes it interesting.
            Keep it two or three sentences max.
          </p>

          <NuxtLink to="/games/placeholder"
            class="font-heading text-xs text-gold hover:text-glow-gold transition-all self-start">
            View Game →
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>

  <!-- ── Latest Devlog ──────────────────────────────────────────────── -->
  <section class="py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-baseline justify-between mb-10">
        <p class="font-heading text-xs text-muted tracking-widest uppercase">Latest Devlog</p>
        <NuxtLink to="/devlog" class="font-heading text-xs text-muted hover:text-gold transition-colors">
          All Posts →
        </NuxtLink>
      </div>

      <div class="border-chunky p-8 flex flex-col gap-6 max-w-2xl">
        <div class="flex items-center gap-4">
          <span class="font-heading text-xs text-neon">Devlog #1</span>
          <span class="font-body text-xs text-muted">April 15, 2026</span>
        </div>

        <h2 class="font-heading text-base text-text leading-loose">
          Placeholder Post Title Goes Here
        </h2>

        <p class="font-body text-sm text-muted leading-relaxed">
          A two or three sentence excerpt from the post. Gives the reader enough to know if it's worth
          clicking, without giving everything away.
        </p>

        <NuxtLink to="/devlog/placeholder"
          class="font-heading text-xs text-gold hover:text-glow-gold transition-all self-start">
          Read More →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
