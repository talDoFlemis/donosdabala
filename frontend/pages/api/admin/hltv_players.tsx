import HLTV, { RankingFilter } from "hltv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  //TODO:REMOVER O POST
  switch (method) {
    case "GET":
      try {
        const HTLVBrazilianPlayers = await HLTV.getPlayerRanking({
          countries: ["Brazil"],
        })

        const top20HLTVPlayers = await HLTV.getPlayerRanking({
          rankingFilter: RankingFilter.Top20,
        })

        res
          .status(200)
          .json({
            sucess: true,
            data: [HTLVBrazilianPlayers, top20HLTVPlayers],
          })
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
  }
}
