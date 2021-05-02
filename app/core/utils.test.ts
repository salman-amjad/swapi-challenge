import { parseCharacterId } from "./utils"

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