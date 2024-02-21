<template>
  <main class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
    <header class="bg-brand-red">
      <div class="flex mx-auto max-w-4xl items-center justify-start">
        <UVMLogo class="py-8 px-4 h-28 text-white" />
      </div>
    </header>
    <slot />
    <footer class="py-4 px-4 text-white bg-gray-700">
      <div class="flex mb-2 items-center justify-center gap-4">
        <a href="https://uvm.mx/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" class="text-sm">Aviso de privacidad</a>
      </div>
      <p class="text-sm text-center">UVM Universidad del valle de México, S.C., Av Marina Nacional 180, Anáhuac 1 sección, Delegación Miguel Hidalgo, Ciudad de México, C.P. 11320.</p>
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
