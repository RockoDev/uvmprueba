<script setup>
const props = defineProps({
  programs: {
    type: Array,
    default: () => ([]),
  },
  modelValue: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const isLoading = ref(false)
const errorMessage = ref(null)
const isFormSent = ref(false)

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')

const _campusId = ref(null)
const campusId = computed({
  get: () => campusList.value.length === 1 ? campusList.value[0].campus_id : _campusId.value,
  set: value => _campusId.value = value,
})

const program = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const campusList = computed(() => program.value?.values ?? [])

const programName = computed(() => program.value?.name ?? null)

const selectedProgramAndCampus = computed(() => {
  return campusId.value ? campusList.value?.find(campus => campus.campus_id === campusId.value) : null
})

const onReset = () => {
  program.value = null
  isFormSent.value = false
}

const onSubmit = async event => {
  try {
    isLoading.value = true

    const body = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      program: selectedProgramAndCampus.value,
    }

    // Validación básica
    if ( !body.firstname ) throw new Error('Por favor ingresa tu nombre.')
    if ( !body.lastname ) throw new Error('Por favor ingresa tu apellido.')
    if ( !body.email ) throw new Error('Por favor ingresa tu email.')
    if ( !body.phone ) throw new Error('Por favor ingresa tu teléfono celular.')
    if ( !body.program ) throw new Error('Es necesario seleccionar un campus.')
  
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if ( !response.ok && response.status !== 400 ) throw new Error('Ocurrió un error al enviar el formulario. Por favor intenta de nuevo.')
    const json = await response.json()
    errorMessage.value = response.status === 400 ? json?.response?.message : null
    if (response.ok) isFormSent.value = response.ok
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const $container = ref(null)
onMounted(() => {
  nextTick(() => $container.value?.scrollIntoView?.({ behavior: 'smooth' }))
})
</script>

<template>
  <div ref="$container" class="py-20">
    <div v-if="!isFormSent" class="mx-auto p-8 w-full max-w-md rounded shadow-md bg-white">
      <h2 class="mb-1 text-2xl font-semibold text-brand-red">Registrate para estudiar:</h2>
      <h3 v-if="programName" class="mb-4 text-lg">{{ programName }}</h3>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label>
              <span class="block mb-2 text-sm font-bold text-gray-700">Nombre<span class="text-red-500">*</span>:</span>
              <input type="text" v-model="firstname" :disabled="isLoading" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500">
            </label>
          </div>
          <div>
            <label>
              <span class="block mb-2 text-sm font-bold text-gray-700">Apellido<span class="text-red-500">*</span>:</span>
              <input type="text" v-model="lastname" :disabled="isLoading" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500">
            </label>
          </div>
          <div>
            <label>
              <span class="block mb-2 text-sm font-bold text-gray-700">Correo Electrónico<span class="text-red-500">*</span>:</span>
              <input type="email" v-model="email" :disabled="isLoading" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500">
            </label>
          </div>
          <div>
            <label>
              <span class="block mb-2 text-sm font-bold text-gray-700">Teléfono<span class="text-red-500">*</span>:</span>
              <input type="tel" v-model="phone" :disabled="isLoading" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500">
            </label>
          </div>
          <div v-if="campusList.length > 1">
            <label>
              <span class="block mb-2 text-sm font-bold text-gray-700">Campus<span class="text-red-500">*</span>:</span>
              <select name="campus" v-model="campusId" :disabled="isLoading" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500">
                <option :value="null">Selecciona un campus</option>
                <option v-for="campus in campusList" :key="campus.campus_id" :value="campus.campus_id">{{ campus.nombrelargo_campus }}</option>
              </select>
            </label>
          </div>
          <div class="flex items-center justify-center">
            <button type="submit" :disabled="isLoading" class="flext items-center justify-center py-2 px-12 h-10 rounded-lg cursor-pointer focus:outline-none focus:shadow-outline-blue text-white bg-brand-red hover:opacity-80">
              <Loading v-if="isLoading" class="w-5 h-5" />
              <span v-else>Enviar</span>
            </button>
          </div>
          <div v-if="errorMessage" class="p-4 text-center text-red-500 bg-red-100 rounded">
            {{ errorMessage }}
          </div>
          <div class="flex items-center justify-center">
            <button type="button" :disabled="isLoading" @click.prevent="onReset" class="py-1 px-6 text-sm rounded-lg cursor-pointer focus:outline-none focus:shadow-outline-blue text-gray-700 bg-gray-100 hover:bg-red-200">Seleccionar otra oferta académica</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="isFormSent" class="mx-auto p-8 w-full max-w-md rounded shadow-md bg-white">
      <h2 class="mb-4 text-2xl font-semibold text-center text-brand-red">¡Gracias por registrarte!</h2>
      <p class="mb-4 text-lg text-center">Apreciamos tu interés y tu solicitud ha sido recibida. Nuestro equipo revisará la información y te contactaremos lo más pronto posible.</p>
      <p class="mb-4 text-lg text-center">¡Esperamos verte muy pronto!</p>
      <div class="flex items-center justify-center">
        <button type="button" @click.prevent="onReset" class="py-1 px-6 text-sm rounded-lg cursor-pointer focus:outline-none focus:shadow-outline-blue text-gray-700 bg-gray-100 hover:bg-gray-200">Regresar</button>
      </div>
    </div>
  </div>
</template>
