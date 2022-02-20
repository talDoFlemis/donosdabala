import { GetServerSideProps } from "next"
import RankingPlayer from "../../models/RankingPlayerModel"
import dbConnect from "../../utils/dbConnect"
import { useState } from "react"

import DashboardLayout from "../../components/layout/DashboardLayout"
import CardRankingsPlayers from "../../components/dashboard/rankingsPlayers/CardRankingsPlayers"
import CardCurrentRanking from "../../components/dashboard/rankingsPlayers/CardCurrentRanking"
import CardBestBrazillianPlayers from "../../components/dashboard/rankingsPlayers/CardBestBrazillianPlayers"
import CreateStrawpoll from "../../components/dashboard/rankingsPlayers/create_strawpoll"
import { SWRConfig, SWRResponse } from "swr"
import axios from "axios"
import CardTop20HLTVPlayers from "../../components/dashboard/rankingsPlayers/CardTop20HLTVPlayers"

interface Props {
  fallback: SWRResponse
}

function RankingsPlayers({ fallback }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function ChangeModalVisibility() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <SWRConfig
      value={{
        fallback,
        fetcher: (url: string) => axios(url).then((r) => r.data),
      }}
    >
      <div className="my-8 flex w-full flex-col rounded-3xl bg-drac_selection p-8 ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl">Ranking Jogadores</h1>
            <h3 className="text-2xl text-drac_foreground">
              Crie novas polls ou gerencie as existentes
            </h3>
          </div>
          <button
            className="btn btn-secondary text-gray-700"
            onClick={ChangeModalVisibility}
          >
            Criar nova votação
          </button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 ">
          <CardCurrentRanking />
          <CardRankingsPlayers />
          <CardBestBrazillianPlayers />
          {/* <CardTop20HLTVPlayers /> */}
          <CreateStrawpoll setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
        </div>
      </div>
    </SWRConfig>
  )
}

export default RankingsPlayers

RankingsPlayers.PageLayout = DashboardLayout

export const getServerSideProps: GetServerSideProps = async () => {
  dbConnect()

  const getRankingsPlayers = await RankingPlayer.find({})
  const polls = await JSON.parse(JSON.stringify(getRankingsPlayers))

  return {
    props: {
      fallback: {
        "/api/admin/strawpoll/": polls,
      },
    },
  }
}
