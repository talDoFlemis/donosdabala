import { Menu } from "@headlessui/react"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import RankingPlayer from "../../models/RankingPlayerModel"
import RankingTeams from "../../models/RankingTeamsModel"
import dbConnect from "../../utils/dbConnect"
interface Props {
  linksRankingPlayers: Array<String>
  linksRankingTeams: Array<String>
}

function index({ linksRankingPlayers, linksRankingTeams }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center md:justify-between lg:justify-around">
      <h1 className="font-logo text-8xl underline underline-offset-4">
        Rankings
      </h1>
      <div className="grid w-screen grid-cols-1 gap-8 md:grid-cols-2">
        <div className="group grid place-items-center md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-none">
          <div className="card hidden from-slate-400/30 via-white to-white transition-opacity duration-300 ease-in-out group-hover:opacity-100 md:row-start-2 md:inline-grid md:bg-gradient-to-b md:opacity-0 lg:col-span-2 lg:row-auto lg:bg-gradient-to-l">
            <div className="flex min-h-[30vh] flex-wrap items-center justify-around space-x-4 p-4">
              {linksRankingPlayers.map((link, index) => (
                <Link key={index} href={`/community_ranking/players/${link}`}>
                  <button className="bg-twitterPurple btn border-none hover:bg-primary-focus">
                    {link}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center transition delay-150 ease-in-out md:group-hover:scale-125">
            <div className=" lg:group-hover:motion-safe:animate-bounce">
              <Image
                src="https://res.cloudinary.com/flemis/image/upload/v1644319742/donosDaBala/players/fallen.png"
                height={300}
                width={300}
              />
            </div>
            <h1 className="text-twitterPurple mt-8 hidden text-center font-logo text-4xl transition-opacity group-hover:opacity-100 md:inline-flex md:opacity-0">
              Jogadores
            </h1>
            <div className="md:hidden">
              <Menu>
                <Menu.Button className="bg-twitterPurple btn mb-2 w-full text-center font-logo text-4xl font-normal text-white hover:bg-purple-500">
                  Ranking Jogadores
                </Menu.Button>
                <Menu.Items className="bg-twitterPurple flex flex-col space-y-2 rounded-md p-4">
                  {linksRankingPlayers.map((link, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link href={`/community_ranking/players/${link}`}>
                          <button
                            className={`${
                              active
                                ? "text-twitterPurple rounded-md bg-white py-1"
                                : "bg-twitterPurple rounded-md py-1 text-white"
                            }`}
                          >
                            {link}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
        <div className="group grid place-items-center md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-none">
          <div className="col-span-1 flex flex-col items-center transition delay-150 ease-in-out md:group-hover:scale-125">
            <div className=" lg:group-hover:motion-safe:animate-bounce">
              <Image
                src="https://res.cloudinary.com/flemis/image/upload/v1644324728/donosDaBala/teams/logoGrande/plano.png"
                width={300}
                height={200}
              />
            </div>
            <h1 className="mt-8 hidden text-center font-logo text-4xl text-red-500 transition-opacity group-hover:opacity-100 md:inline-flex md:opacity-0">
              Times
            </h1>
            <div className="md:hidden">
              <Menu>
                <Menu.Button className="btn mb-2 w-full bg-red-500 text-center font-logo text-4xl font-normal text-white hover:bg-red-700">
                  Ranking Times
                </Menu.Button>
                <Menu.Items className="flex flex-col space-y-2 rounded-md bg-red-500 p-4">
                  {linksRankingPlayers.map((link, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link href={`/community_ranking/players/${link}`}>
                          <button
                            className={`${
                              active
                                ? "rounded-md bg-white py-1 text-red-500"
                                : "rounded-md bg-red-500 py-1 text-white"
                            }`}
                          >
                            {link}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <div className="card hidden from-slate-400/30 via-white to-white transition-opacity duration-300 ease-in-out group-hover:opacity-100 md:row-start-2 md:inline-grid md:bg-gradient-to-b md:opacity-0 lg:col-span-2 lg:row-auto lg:bg-gradient-to-r">
            <div className="flex min-h-[30vh] flex-wrap items-center justify-around space-x-4 p-4">
              {linksRankingTeams.map((link, index) => (
                <Link key={index} href={`/community_ranking/teams/${link}`}>
                  <button className="btn border-none bg-red-500 hover:bg-red-700">
                    {link}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

export const getStaticProps: GetStaticProps = async () => {
  dbConnect()

  const respPlayers = await RankingPlayer.find({})
  const rankingPlayers = await JSON.parse(JSON.stringify(respPlayers))
  const linksRankingPlayers = rankingPlayers.map((ranking: any) => ranking.slug)

  const respTeams = await RankingTeams.find({})
  const rankingTeams = await JSON.parse(JSON.stringify(respTeams))
  const linksRankingTeams = rankingTeams.map((ranking: any) => ranking.slug)

  return {
    props: {
      linksRankingPlayers,
      linksRankingTeams,
    },
    revalidate: 3600,
  }
}
