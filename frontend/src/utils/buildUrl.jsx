export default function buildUrl(endpoint, parameters){
  const url = new URL(endpoint)
  for (const [key, value] of Object.entries(parameters)){
    if (value){
      url.searchParams.set(key, value)
    }
  }
  return url
}