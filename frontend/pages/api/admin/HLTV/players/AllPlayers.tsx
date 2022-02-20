import HLTV from "hltv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  switch (method) {
    case "GET":
      try {
        const Top20Players = await HLTV.getPlayerRanking()
        res.status(200).json(Top20Players)
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, error })
      }
      break
  }
}
