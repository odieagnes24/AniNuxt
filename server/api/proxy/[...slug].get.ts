export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiDomain = config.apiDomain 
    const apiKey = config.apiKey
    const slug = event.context.params.slug

    const response = await $fetch(`${apiDomain}/${slug}`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      }
    })
    
    return response
  })
  