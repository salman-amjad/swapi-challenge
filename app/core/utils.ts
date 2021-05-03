import { Person } from "graphql/models"
import { FiltersChangeType } from "app/characters/components"

/**
 * This function is used to parse base64 encoded ID
 * @param id ID to be parsed
 * @returns parsed string ID or null
 */
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

/**
 * This function is used to match some text using a keyword
 * @param keyword a string keyword
 * @param text a piece of text
 * @returns if the keyword matched the text
 */
export const matchText = (keyword: string, text: string) => {
  return new RegExp(keyword, "i").test(text)
}

/**
 * Filters a list of characters by name using keyword
 * @param keyword string keyword used for matching
 * @param characters list of characters
 * @returns filtered list of characters
 */
export const filterCharactersByName = (keyword: string, characters: Person[]) => (
  characters.filter(character => (
    !!character.name && matchText(keyword, character.name)
  ))
)

/**
 * This function is used to filter a list of characters by an attribute
 * @param attribute attribute name
 * @param filters an array of filters values
 * @param characters a list of characters
 * @returns a filtered list of characters
 */
export const filterCharactersByAttribute = (attribute: keyof FiltersChangeType, filters: string[], characters: Person[]) => (
  characters.filter(character => {
    switch (attribute) {
      case "films":
        if (!!character.filmConnection && !!character.filmConnection.films) {
          return character.filmConnection.films.some(film => !!film && filters.includes(film.id))
        }
        return false
      case "planets":
        if (!!character.homeworld && !!character.homeworld.id) return filters.includes(character.homeworld.id)
        return false
      case "species":
        if (!!character.species && !!character.species.id) return filters.includes(character.species.id)
        return false
      default:
        return false
    }
  })
)

/**
 * This function is used to sort a list characters using an attribute e.g name, height, gender etc
 * @param sortBy the attribute to be used
 * @param characters list of the characters to be sorted
 * @returns a sorted list of characters
 */
export type SortableAttributes = keyof Pick<Person, "name" | "gender" | "height">
export const sortCharactersByAttribute = (sortBy: SortableAttributes, characters: Person[]) => {
  switch (sortBy) {
    default:
      return characters
    case "name":
      return characters.sort(doStringCompare(sortBy))
    case "gender":
      return characters.sort(doStringCompare(sortBy))
    case "height":
      return characters.sort(doNumericCompare(sortBy))
  }
}

/**
 * A low level function to compare 2 characters using a numeric attribute
 * @param sortKey attribute name
 * @returns A and B difference or 0 if the values are equal or NaN
 */
const doNumericCompare = (sortKey: SortableAttributes) => (characterA: Person, characterB: Person) => {
  const valueA = parseInt(`${characterA[sortKey]}`)
  const valueB = parseInt(`${characterB[sortKey]}`)
  if (!isNaN(valueA) && !isNaN(valueB)) return valueA - valueB
  return 0
}

/**
 * A low level function to compare 2 characters using a string attribute
 * @param sortKey attribute name
 * @returns 1, -1 or 0 based on the comparison
 */
const doStringCompare = (sortKey: SortableAttributes) => (characterA: Person, characterB: Person) => {
  const valueA = `${characterA[sortKey]}`.toUpperCase()
  const valueB = `${characterB[sortKey]}`.toUpperCase()
  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0
}