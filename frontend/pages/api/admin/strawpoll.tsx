import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import RankingPlayer from "../../../models/RankingPlayerModel"
import dbConnect from "../../../utils/dbConnect"

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  //TODO: Provavelmente mudar isso aqui pra put pra permitir eu colocar de forma dinamica o valor pra dar update
  switch (method) {
    case "GET":
      try {
        let players = await RankingPlayer.find({})
        res.status(200).json(players)
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const poll = req.body.data
          const week = parseInt(poll.poll.week)

          const resp = await fetch("https://strawpoll.com/api/poll", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "API-KEY": process.env.STRAWPOLL_KEY as string,
            },
            body: JSON.stringify(poll),
          }).then((resp) => resp.json())

          const id = await resp.content_id
          const is_selected = false

          await RankingPlayer.create({
            id,
            is_selected,
          })

          const getStrawpoll: any = await fetch(
            `https://strawpoll.com/api/poll/${id}`
          )

          const strawpollResponse = await getStrawpoll
            .json()
            .then((respon: any) => respon.content)

          strawpollResponse.id = id
          strawpollResponse.is_selected = is_selected
          strawpollResponse.week = week
          strawpollResponse.slug = `semana-${week}`

          const updateProperties = await RankingPlayer.findOneAndReplace(
            { id: id },
            strawpollResponse
          )

          res.status(201).json(updateProperties)
        } catch (error) {
          res.status(500).json({ sucess: false, error })
        }
      }
      break
    case "DELETE":
      {
        try {
          const resp = await axios.delete(
            "https://strawpoll.com/api/content/delete",
            {
              headers: {
                "API-KEY": process.env.STRAWPOLL_KEY as string,
              },
              data: req.body,
            }
          )

          const getPollToRemove = resp.data

          if (getPollToRemove.success === 1) {
            const getId = req.body
            const removePollFromMongo = await RankingPlayer.findOneAndDelete({
              id: getId.content_id,
            })
            const resp = JSON.parse(JSON.stringify(removePollFromMongo))

            res.status(200).json({ sucess: true, data: resp })
          } else {
            res.status(500).json({ sucess: false, getPollToRemove })
          }
        } catch (error) {
          console.log(error)
          res.status(500).json({ sucess: false, Error })
        }
      }
      break
  }
}
