import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import dbConnect from "../../utils/dbConnect"
import { UserTypings, rankingPlayers } from "../../typings"
import User from "../../models/User"

import DashboardLayout from "../../components/layout/DashboardLayout"
import RankingPlayer from "../../models/RankingPlayerModel"
import useSWR, { SWRConfig, SWRResponse, Fetcher } from "swr"
import axios, { AxiosResponse } from "axios"
interface Props {
  userData: UserTypings
  fallback: SWRResponse
}

function Polls() {
  // `data` will always be available as it's in `fallback`.
  const { data: polls } = useSWR("/api/admin/strawpoll/")
  return (
    <div>
      <h1>{polls?.map((r: any) => r.slug)}</h1>
    </div>
  )
}

function dashboard({ userData, fallback }: Props) {
  return (
    <SWRConfig
      value={{
        fallback,
        fetcher: (url: string) => axios(url).then((r) => r.data),
      }}
    >
      <div className="my-8 flex w-full rounded-3xl bg-drac_selection p-4">
        <h1 className="text-6xl">Bem vindo, {userData.name}</h1>
        <Polls />
      </div>
    </SWRConfig>
  )
}

dashboard.PageLayout = DashboardLayout

export default dashboard

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  dbConnect()

  const userData = await User.find({ email: session?.user.email }).then(
    (resp) => JSON.parse(JSON.stringify(resp[0]))
  )

  const resp = await RankingPlayer.find({})
  const polls = await JSON.parse(JSON.stringify(resp))

  return {
    props: {
      userData,
      fallback: {
        "/api/admin/strawpoll/": polls,
      },
    },
  }
}

//TODO:MUDAR TODO O SISTEMA DE APIS QUE TA RETORNANDO UM SUCCESS AND DATA PQ EU TO TENDO QUE FAZER MUITA MARACUTAIA
