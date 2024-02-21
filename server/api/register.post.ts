export default defineEventHandler(async (event) => {
  const ip = event?.node?.req?.socket?.remoteAddress || event?.node?.req?.headers?.['x-forwarded-for']
  const body = await readBody(event)
  return {
    event: event,
    ip,
    body,
  }
})
