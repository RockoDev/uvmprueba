<template>
  <main>
    <header class="bg-brand-red">
      <div class="flex mx-auto max-w-4xl items-center justify-start">
        <UVMLogo class="py-8 px-4 h-28 text-white" />
      </div>
    </header>
    <slot />
    <footer class="py-2 px-4">
      <p class="text-sm text-center">&copy; 2024</p>
    </footer>
  </main>
</template>

<style>
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  min-height: 100dvh;
}
</style>
