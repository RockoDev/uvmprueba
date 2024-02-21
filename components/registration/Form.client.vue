<script setup>
const props = defineProps({
  program: {
    type: Object,
    default: null,
  },
})

const campusList = computed(() => {
  return (props.program?.values ?? []).map(item => ({
    id: item.campus_id,
    name: item.nombrelargo_campus,
    short_name: item.abr_campus,
  }))
})

const onSubmit = async event => {
  const formData = new FormData(event.target)
  const body = Object.fromEntries(formData.entries())

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await response.json()
  console.log(json)
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <h1 class="text-3xl font-bold text-center">Registrate</h1>
      <div class="grid mx-auto px-4 max-w-screen-md grid-cols-1 gap-4">
        <div>
          <label>
            <span class="font-bold">Nombre<span class="text-red-500">*</span>:</span>
            <input type="text" name="firstname" placeholder="" />
          </label>
        </div>
        <div>
          <label>
            <span class="font-bold">Apellido<span class="text-red-500">*</span>:</span>
            <input type="text" name="lastname" placeholder="" />
          </label>
        </div>
        <div>
          <label>
            <span class="font-bold">Email<span class="text-red-500">*</span>:</span>
            <input type="email" name="email" placeholder="" />
          </label>
        </div>
        <div>
          <label>
            <span class="font-bold">Teléfono<span class="text-red-500">*</span>:</span>
            <input type="tel" name="phone" placeholder="" />
          </label>
        </div>
        <div v-if="campusList.length > 1">
          <label>
            <span class="font-bold">Campus<span class="text-red-500">*</span>:</span>
            <select>
              <option value="">Selecciona un campus</option>
              <option v-for="campus in campusList" :key="campus.id" :value="campus.id">{{ campus.name }}</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>


