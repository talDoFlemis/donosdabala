import { GetStaticPaths, GetStaticProps } from "next"
import RankingTeams from "../../../models/RankingTeamsModel"
import { rankingTeams } from "../../../typings"
import dbConnect from "../../../utils/dbConnect"
import cl from "clsx"
import Image from "next/image"

interface Props {
  ranking: rankingTeams
}

function RankingTeamsSemana({ ranking }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-16 bg-[#11041d] px-4 pt-16 text-white  lg:px-8 lg:pt-8">
      <div className=" text-center font-logo">
        <h1 className="text-6xl">Ranking dos Times</h1>
        <h3 className="mt-4 text-5xl">Semana {ranking.week}</h3>
      </div>
      <div>
        {" "}
        <div className="transition-transform duration-300 ease-in-out hover:scale-110">
          <Image src={ranking.ranking[0].team_image} width={300} height={300} />
        </div>
        <h1 className="mt-8 text-center font-logo text-5xl uppercase">
          {ranking.ranking[0].team_name}
        </h1>
      </div>
      <div className="card  w-screen bg-white font-bold text-black md:w-2/3 lg:w-3/5 xl:w-2/5 2xl:w-1/3">
        <div className="card-body">
          {ranking.ranking.map((team, index) => (
            <div
              key={team._id}
              className={cl(
                "mb-4 flex cursor-pointer items-center justify-between rounded-md px-4 py-1 transition-colors ease-in-out hover:bg-accent hover:text-white",
                index <= 0 && "hidden"
              )}
            >
              <div className="flex items-center">
                <h3 className="mr-2">{index + 1}</h3>
                <img
                  src={team.team_image}
                  alt={team.team_name}
                  className="mask mask-circle mr-4 h-14 w-14"
                />
                <h3 className="uppercase">{team.team_name}</h3>
              </div>
              <div className="grid w-1/5 grid-cols-2 place-items-center space-x-4">
                {team.team_votes_porcentage && (
                  <h3 className="font-normal ">
                    {team.team_votes_porcentage} %
                  </h3>
                )}
                {team.team_last_position !== undefined &&
                team.team_last_position !== index + 1 ? (
                  <div className="flex items-center">
                    <h3>{team.team_last_position - (index + 1)}</h3>{" "}
                    <div
                      className={cl(
                        "badge badge-sm",
                        team.team_last_position - (index + 1) < 0
                          ? "mask mask-triangle-2 bg-drac_red"
                          : "mask mask-triangle bg-drac_green"
                      )}
                    ></div>
                  </div>
                ) : (
                  <div className="badge badge-sm"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RankingTeamsSemana

export const getStaticPaths: GetStaticPaths = async () => {
  dbConnect()

  const getRankings = await RankingTeams.find({})
  const rankings = await JSON.parse(JSON.stringify(getRankings))

  const paths = await rankings.map((rank: any) => ({
    params: { slug: rank?.slug },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const getRanking = await RankingTeams.find({ slug: params?.slug })
  const ranking = await JSON.parse(JSON.stringify(getRanking[0]))

  return {
    props: {
      ranking,
    },
  }
}
