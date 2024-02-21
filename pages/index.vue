<script setup>
const { pending: isLoading, data } = await useFetch('/api/programs', {
  lazy: true,
  server: false
})
const programs = computed(() => data.value?.programs ?? [])
</script>

<template>
  <NuxtLayout>
    <section class="mx-auto px-4 py-8 max-w-4xl">
      <article>
        <h1 class="text-4xl font-bold mb-12">¡Bienvenido(a) futuro(a) estudiante!</h1>
        <p class="text-lg mb-8">Estamos emocionados de que estés considerando unirte a nuestra comunidad académica. En nuestra universidad, valoramos el deseo de aprender, la dedicación y el compromiso con el crecimiento personal y profesional.</p>
        <p class="text-lg mb-8">Para comenzar tu emocionante viaje hacia el conocimiento y el éxito, necesitamos saber más sobre tus intereses y metas académicas. Por favor, tómate un momento para explorar nuestras diversas carreras y selecciona aquella que realmente te apasione. Estamos aquí para apoyarte en cada paso del camino y ayudarte a alcanzar tus objetivos.</p>
        <p class="text-lg mb-8">No dudes en preguntar si necesitas más información o asistencia. ¡Esperamos verte pronto en nuestro campus y ser parte de tu viaje hacia el éxito académico!</p>
      </article>
      <ProgramSelector :isLoading="isLoading" :programs="programs" />
    </section>
  </NuxtLayout>
</template>
