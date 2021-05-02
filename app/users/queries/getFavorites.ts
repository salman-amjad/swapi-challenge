import { Ctx } from "blitz"
import db from "db"

export default async function getFavorites(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const favorites = await db.favorites.findMany({
    where: { userId: session.userId },
    select: { id: true, characterId: true },
  })

  return favorites
}
