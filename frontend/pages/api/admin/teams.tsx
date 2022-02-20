import { NextApiRequest, NextApiResponse } from "next"
import RankingTeams from "../../../models/RankingTeamsModel"
import dbConnect from "../../../utils/dbConnect"

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "GET":
      try {
        const players = await RankingTeams.find({})
        res.status(200).json(players)
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const { is_selected, slug, week, ranking } = req.body
          const players = await RankingTeams.create({
            is_selected,
            slug,
            week,
            ranking,
          })
          res.status(201).json({ sucess: true, data: players })
        } catch (error) {
          console.log(error)
          res.status(500).json({ sucess: false, Error })
        }
      }
      break
  }
}
