import parseUA from 'ua-parser-js'

const sendData = async (data: {}) => {
  try {
    const response = await fetch('https://webhooksqa.uvm.mx/proc-leads/lead/medios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if ( !response.ok ) throw new Error(`Response status ${response.status}.`)
    const json = await response.json()
    return { ok: true, ...json }
  } catch (error: any) {
    console.error(error)
    return { ok: false, error: error.message }
  }
}

export default defineEventHandler(async (event) => {
  // const ip = event?.node?.req?.socket?.remoteAddress || event?.node?.req?.headers?.['x-forwarded-for']
  const referer = getHeader(event, 'referer')
  const ua = parseUA(getHeader(event, 'user-agent'))
  const body = await readBody(event)

  // if (!Number.isInteger(id)) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'ID should be an integer',
  //   })
  // }
  const data = {
    nombre: body?.firstname,
    apaterno: body?.lastname,
    email: body?.email,
    celular: body?.phone,

    campusLargo: body?.program?.nombrelargo_campus,
    carrera: body?.program?.ofertando_crmit_name,
    carreraInteres: body?.program?.carrerainteres,
    subNivelInteres: body?.program?.subNivelInteres,
    nivelInteres: body?.program?.nivelInteres,
    ciclo: body?.program?.crmit_ciclo,

    urlreferrer: referer,
    dispositivo: `${ua.device.model} (${ua.device.vendor}) - ${ua.browser.name} ${ua.browser.version}`,

    banner: 'bernardo',
    CID: '2016705784.1697574806',
    verify_token: 'UVM.G0-24',
    marcable: 1,
    gclid: '',
    utm_campaign: '',
  }
  // const response = await sendData(data)

  return {
    body,
    data,
  }
})
