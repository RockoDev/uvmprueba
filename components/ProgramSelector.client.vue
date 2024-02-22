<script setup>
const props = defineProps({
  programs: {
    type: Array,
    default: () => ([]),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const groupBy = (array, callback) => {
  const result = {}
  for ( const item of array ) {
    const key = callback(item)
    if ( !(key in result) ) result[key] = []
    result[key].push(item)
  }
  return result
}

const selectors = computed(() => {
  return Object.entries(groupBy(props.programs, ({ mkt_name }) => mkt_name)).map(([name, values]) => {
    return {
      name,
      values: Object.entries(groupBy(values, ({ crmit_vertical }) => crmit_vertical)).map(([name, values]) => {
        return {
          name,
          values: Object.entries(groupBy(values, ({ ofertando_crmit_name }) => ofertando_crmit_name)).map(([name, values]) => {
            return {
              name,
              values,
            }
          }),
        }
      }),
    }
  })
})

const onSelect = selection => modelValue.value = selection

</script>

<template>
  <div class="mx-auto max-w-sm">
    <div v-if="isLoading">Cargando...</div>
    <VaAccordion v-if="!isLoading">
      <VaCollapse v-for="selector1 in selectors" :key="selector1.name" :header="selector1.name" body-color="background-element">
        <template #body>
          <VaAccordion>
            <VaCollapse v-for="selector2 in selector1.values" :key="selector2.name" :header="selector2.name" body-color="#ffffff">
              <template #header="{ value, attrs, iconAttrs, text }">
                <div v-bind="attrs" class="py-1 px-4 hover:bg-black/20">
                  <VaIcon
                    name="va-arrow-down"
                    :class="value ? '' : 'rotate-[-90deg]'"
                    v-bind="iconAttrs"
                  />
                  {{ text }}
                </div>
              </template>
              <template #body>
                <div v-for="selector3 in selector2.values" :key="selector3.name" class="flex py-2 px-8 items-center justify-start gap-2 hover:bg-black/20">
                  <span>&bull;</span>
                  <button type="button" class="flex-1 text-left" @click.prevent="onSelect(selector3)">
                     {{ selector3.name }}
                  </button>
                </div>
              </template>
            </VaCollapse>
          </VaAccordion>
        </template>
      </VaCollapse>
    </VaAccordion>
  </div>
</template>