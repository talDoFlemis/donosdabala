import { GetStaticProps } from "next"
import Head from "next/head"
import dotenv from "dotenv"
import { motion } from "framer-motion"

import BioHosts from "../components/home/BioHosts"
import EntryPage from "../components/home/EntryPage"
import TwitterInteraction from "../components/home/TwitterInteraction"
import Navbar from "../components/layout/Navbar"
import RankingPlayer from "../models/RankingPlayerModel"
import RankingTeams from "../models/RankingTeamsModel"
import { rankingPlayers, rankingTeams, tweetsDonosData } from "../typings"
import dbConnect from "../utils/dbConnect"
import HomePlayerOfTheWeek from "../components/home/HomePlayerOfTheWeek"
import HomeTeamOfTheWeek from "../components/home/HomeTeamOfTheWeek"
interface Props {
  rankingPlayersThisWeek: rankingPlayers
  tweetsDonos: tweetsDonosData
  rankingTeamsThisWeek: rankingTeams
}

export default function Home({
  rankingPlayersThisWeek,
  rankingTeamsThisWeek,
  tweetsDonos,
}: Props) {
  return (
    <div className="min-h-screen bg-twitchPurple font-Oxigen text-white">
      <Head>
        <title>Os Donos da Bala</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <EntryPage />
      <BioHosts />
      <HomePlayerOfTheWeek rankingPlayersThisWeek={rankingPlayersThisWeek} />
      <HomeTeamOfTheWeek rankingTeamsThisWeek={rankingTeamsThisWeek} />
      <TwitterInteraction tweetsDonos={tweetsDonos} />
    </div>
  )
}
//TODO:TIRAR DO RANKING DO APOKAO O CREATE DO ROLES
export const getStaticProps: GetStaticProps = async () => {
  dbConnect()

  const rankingPlayers = await RankingPlayer.findOne({ is_selected: true })
  const rankingPlayersThisWeek = await JSON.parse(
    JSON.stringify(rankingPlayers)
  )

  const getRankingTeams = await RankingTeams.findOne({ is_selected: true })
  const rankingTeamsThisWeek = await JSON.parse(JSON.stringify(getRankingTeams))

  const getTweets = await fetch(
    "https://api.twitter.com/2/tweets/search/recent?query=%23donosdabala&tweet.fields=created_at&expansions=author_id,attachments.media_keys&user.fields=created_at,profile_image_url&media.fields=preview_image_url,url",
    {
      headers: {
        Authorization: ("Bearer " + process.env.BEARER_TOKEN_TWITTER) as string,
      },
    }
  )
  const tweetsDonos = await getTweets.json()

  return {
    props: {
      rankingPlayersThisWeek,
      rankingTeamsThisWeek,
      tweetsDonos,
    },
    revalidate: 3600,
  }
}
//FIXME: TALVEZ ISSO DE PUXAR UMA PI COM GET STATIC PROPS VA DAR MERDA https://nextjs.org/learn/basics/api-routes/api-routes-details
//TODO:ADICIONAR OS HEADERS EM TODAS AS PAGINAS E MUDAR O ICONE
