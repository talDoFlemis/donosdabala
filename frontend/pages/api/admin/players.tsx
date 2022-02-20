import HLTV from "hltv"
import { NextApiRequest, NextApiResponse } from "next"
import RankingPlayer from "../../../models/RankingPlayerModel"
import dbConnect from "../../../utils/dbConnect"

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  //TODO:REMOVER O POST
  switch (method) {
    case "GET":
      try {
        let ranking = await RankingPlayer.findOne({}).sort({ _id: -1 }).limit(1)
        // const { id } = ranking
        // const { _id } = ranking
        // const resp = await fetch(`https://strawpoll.com/api/poll/${id}`).then(
        //   (resp) => resp.json()
        // )
        // const updatedRanking = await resp.content
        // const sortPlayersByVotes = updatedRanking.poll.poll_answers.sort(
        //   (a: any, b: any) => b.votes - a.votes
        // )
        // let createPlayerOfWeek: any = {
        //   name: sortPlayersByVotes[0].answer,
        //   img: "",
        // }
        // const getPlayerOfWeekImage = await HLTV.getPlayerByName({
        //   name: createPlayerOfWeek.name,
        // }).then((resp) => resp.image)

        // createPlayerOfWeek.img = getPlayerOfWeekImage

        // ranking = updatedRanking
        // ranking.poll.poll_answers = sortPlayersByVotes
        // ranking.playerOfWeek = createPlayerOfWeek
        // ranking._id = _id

        // const updatedMongo = await RankingPlayer.findOneAndReplace(
        //   { _id },
        //   ranking,
        //   {
        //     new: true,
        //   }
        // )

        res.status(200).json({ sucess: true, data: ranking })
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const { is_selected, id, slug, week, playerOfWeek, poll, title } =
            req.body
          const sortPlayersByVotes = req.body.poll.poll_answers.sort(
            (a: any, b: any) => b.votes - a.votes
          )
          const players = await RankingPlayer.create({
            is_selected,
            id,
            slug,
            week,
            playerOfWeek,
            sortPlayersByVotes,
            poll,
            title,
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
