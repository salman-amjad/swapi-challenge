export const parseCharacterId = (id?: string) => {
  // Return null if no ID is provided
  if (!!!id) return null

  // Base64 decode the ID
  const decodedId = atob(id)

  // Extract the numeric ID from format `xxxxxx:1`, `xxxxxx:2`
  const result = /\d+/.exec(decodedId)

  // Return the numeric ID or null
  return !!result && !!result.length ? result[0] : null
}