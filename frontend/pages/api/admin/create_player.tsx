import { NextApiRequest, NextApiResponse } from "next"
import Player from "../../../models/PlayerModel"
import RankingPlayer from "../../../models/RankingPlayerModel"
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
        const players = await Player.find({})

        res.status(200).json({ sucess: true, data: players })
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const { name, img } = req.body
          const player = await Player.create({ name, img })

          res.status(201).json({ sucess: true, data: player })
        } catch (error) {
          res.status(500).json({ sucess: false, error })
        }
      }
      break
    case "DELETE":
      {
        try {
          const { content_id } = req.body

          const resp = await fetch("https://strawpoll.com/api/content/delete", {
            method: "DELETE",
            headers: {
              "API-KEY": process.env.STRAWPOLL_KEY as string,
            },
            body: JSON.stringify(content_id),
          })

          const pollRemove = await resp.json()

          res.status(200).json({ sucess: true, data: pollRemove })
        } catch (error) {
          console.log(error)
          res.status(500).json({ sucess: false, Error })
        }
      }
      break
  }
}
