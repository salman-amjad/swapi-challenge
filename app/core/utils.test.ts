import { Person } from "graphql/models"
import { parseCharacterId, matchText, filterCharactersByName, sortCharactersByAttribute, filterCharactersByAttribute } from "./utils"
import { sampleCharacters } from "test/charactersTestData"

it("Parse SWAPI object ID (1)", () => {
  const input = btoa("people:1")
  const parsedId = parseCharacterId(input)
  expect(parsedId).toEqual("1")
})

it("Parse SWAPI object ID (2)", () => {
  const input = btoa("people:12345")
  const parsedId = parseCharacterId(input)
  expect(parsedId).toEqual("12345")
})

it("Test match text using a keyword", () => {
  const text = "Luke SkyWalker"
  const keyword = "luke"
  const isMatched = matchText(keyword, text)
  expect(isMatched).toBeTruthy()
})

it("Filter list of characters using a keyword", () => {
  const filteredList = filterCharactersByName("luke", sampleCharacters)
  expect(filteredList.length).toEqual(1)
})

it("Sort characters using height attribute", () => {
  const sortedCharacters = sortCharactersByAttribute("height", sampleCharacters)
  // Get the heights in an array to match the order
  expect(sortedCharacters.map(({ height }) => height)).toEqual([96, 150, 167, 172, 202])
})

it("Sort characters using name attribute", () => {
  const sortedCharacters = sortCharactersByAttribute("name", sampleCharacters)
  // Get the names in an array to match the order
  expect(sortedCharacters.map(({ name }) => name)).toEqual(["C-3PO", "Darth Vader", "Leia Organa", "Luke Skywalker", "R2-D2"])
})

it("Sort characters using gender attribute", () => {
  const sortedCharacters = sortCharactersByAttribute("gender", sampleCharacters)
  // Get the names in an array to match the order
  expect(sortedCharacters.map(({ gender }) => gender)).toEqual(["female", "male", "male", "n/a", "n/a"])
})

it("Filter characters by an attribute (films)", () => {
  const filteredCharacters = filterCharactersByAttribute("films", ["ZmlsbXM6NQ=="], sampleCharacters)
  expect(filteredCharacters.map(({ name }) => name)).toEqual(["C-3PO", "R2-D2"])
})

it("Filter characters by an attribute (planets)", () => {
  const filteredCharacters = filterCharactersByAttribute("planets", ["cGxhbmV0czox"], sampleCharacters)
  expect(filteredCharacters.map(({ name }) => name)).toEqual(["Darth Vader", "Luke Skywalker", "C-3PO"])
})

it("Filter characters by an attribute (species)", () => {
  const filteredCharacters = filterCharactersByAttribute("species", ["c3BlY2llczoy"], sampleCharacters)
  expect(filteredCharacters.map(({ name }) => name)).toEqual(["C-3PO", "R2-D2"])
})