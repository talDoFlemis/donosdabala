import HLTV, { RankingFilter } from "hltv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  switch (method) {
    case "GET":
      try {
        const HTLVBrazilianPlayers = await HLTV.getPlayerRanking({
          countries: ["Brazil"],
        })

        res.status(200).json({ players: HTLVBrazilianPlayers })
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
  }
}
