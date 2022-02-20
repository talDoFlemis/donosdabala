import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { NextApiRequest, NextApiResponse } from "next"
import PowerRanking from "../../../models/PowerRankingModel"
import apolloClient from "../../../utils/apolloClient"
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
        const { data } = await apolloClient.query({
          query: gql`
            query {
              powerRankingApokaos {
                data {
                  id
                  attributes {
                    title
                    slug
                    week
                  }
                }
              }
            }
          `,
        })

        res.status(200).json(data.powerRankingApokaos.data)
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const { is_selected, slug, week, ranking } = req.body
          const powerRankingCreated = await PowerRanking.create({
            is_selected,
            slug,
            week,
            ranking,
          })
          res.status(201).json(powerRankingCreated)
        } catch (error) {
          console.log(error)
          res.status(500).json({ sucess: false, Error })
        }
      }
      break
  }
}
