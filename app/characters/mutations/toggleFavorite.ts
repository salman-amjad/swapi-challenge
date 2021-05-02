import { resolver, Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const SaveFavorite = z
  .object({
    characterId: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(SaveFavorite),
  resolver.authorize(),
  async ({ characterId }, { session }: Ctx) => {
    if (!session.userId) return false

    // Check if the favorite already exists
    const inFavorite = await db.favorites.findFirst({ where: { userId: session.userId, characterId } })
    if (!!inFavorite) {
      await db.favorites.delete({ where: { id: inFavorite.id } })
      return false
    } else {
      await db.favorites.create({ data: { userId: session.userId, characterId } })
      return true
    }
  }
)
