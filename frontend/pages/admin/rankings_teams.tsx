import dbConnect from "../../utils/dbConnect"
import { SWRConfig, SWRResponse } from "swr"
import axios from "axios"
import { GetServerSideProps } from "next"

import DashboardLayout from "../../components/layout/DashboardLayout"
import CardPowerRankingApokao from "../../components/dashboard/rankingsTeams/CardPowerRankingApokao"
import RankingTeams from "../../models/RankingTeamsModel"
import CardCommunityTeamsRanking from "../../components/dashboard/rankingsTeams/CardCommunityTeamsRanking"

interface Props {
  fallback: SWRResponse
}

function RankingsTeams({ fallback }: Props) {
  return (
    <SWRConfig
      value={{
        fallback,
        fetcher: (url: string) => axios(url).then((r) => r.data),
      }}
    >
      <div className="my-8 flex w-full flex-col rounded-3xl bg-drac_selection p-8">
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl">Ranking dos Times</h1>
          <p className="text-2xl">
            Gerenciar as votações dos times, junto com o Power Ranking e Ranking
            HLTV
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          <CardPowerRankingApokao />
          <CardCommunityTeamsRanking />
        </div>
      </div>
    </SWRConfig>
  )
}

export default RankingsTeams

RankingsTeams.PageLayout = DashboardLayout

export const getServerSideProps: GetServerSideProps = async () => {
  dbConnect()

  const getRankingsPlayers = await RankingTeams.find({})
  const teams = await JSON.parse(JSON.stringify(getRankingsPlayers))

  return {
    props: {
      fallback: {
        "/api/admin/teams/": teams,
      },
    },
  }
}
