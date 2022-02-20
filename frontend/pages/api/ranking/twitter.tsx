import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "GET":
      try {
        const resp = await fetch(
          "https://api.twitter.com/2/tweets/search/recent?query=%23donosdabala&tweet.fields=created_at&expansions=author_id,attachments.media_keys&user.fields=created_at,profile_image_url&media.fields=preview_image_url,url",
          {
            headers: {
              Authorization: ("Bearer " +
                process.env.BEARER_TOKEN_TWITTER) as string,
            },
          }
        ).then((resp) => resp.json())

        res.status(200).json({ sucess: true, data: resp })
      } catch (error) {
        console.log(error)
        res.status(500).json({ sucess: false, Error })
      }
      break
    case "POST":
      {
        try {
          const poll = {
            poll: {
              title: "Criando um novo post",
              answers: ["answer #1", "answer #2", "answer #3"],
              ma: true,
            },
          }
          const testeOutraPoll = req.body
          console.log(JSON.stringify(poll))
          console.log(testeOutraPoll)
          console.log(JSON.stringify(testeOutraPoll))
          const resp = await fetch("https://strawpoll.com/api/poll", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "API-KEY": process.env.STRAWPOLL_KEY as string,
            },
            body: testeOutraPoll,
          })
          //   console.log("Strawpoll resp", resp)
          res.status(201).json({ sucess: true, data: resp })
        } catch (error) {
          console.log(error)
          res.status(500).json({ sucess: false, Error })
        }
      }
      break
  }
}
