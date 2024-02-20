const getPrograms = async () => {
  try {
    const response = await fetch('https://uvm.mx/suitev3/get_ofertando_vigente')
    if ( !response.ok ) throw new Error(`Response status ${response.status}.`)
    const { message = [] } = await response.json()
    return message
  } catch (error) {
    console.error(error)
  }
  return []
}

export default defineEventHandler(async (event) => {
  const programs = await getPrograms()
  return {
    programs,
  }
})
