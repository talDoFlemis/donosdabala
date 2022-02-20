import cl from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import RankingPlayer from "../../../models/RankingPlayerModel"
import { rankingPlayers } from "../../../typings"
import dbConnect from "../../../utils/dbConnect"

interface Props {
  ranking: rankingPlayers
}

function RankingPlayerSemana({ ranking }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-16 bg-[#11041d] px-4 pt-16 text-white  lg:px-8 lg:pt-8">
      <div className="text-center font-logo">
        <h1 className="text-6xl">Ranking dos Jogadores</h1>
        <h2 className="text-5xl">Semana {ranking.week}</h2>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 font-bold">
        <div className="group col-start-2 flex scale-110  cursor-pointer flex-col items-center transition-transform">
          <div className="avatar">
            <div className="animate-bounce rounded-full ring ring-accent transition-colors duration-300 group-hover:bg-accent">
              <Image src={ranking.playerOfWeek.img} width={150} height={150} />
            </div>
          </div>
          <h1 className="mt-2 font-logo text-3xl font-normal uppercase">
            {ranking.playerOfWeek.name}
          </h1>
          <h2 className="text-sm text-gray-400">
            {ranking.poll.poll_answers[0]?.votes}
          </h2>
        </div>
        <div className="group col-start-1 row-start-2 flex cursor-pointer flex-col items-center transition-transform hover:scale-110">
          <div className="avatar ">
            <div className="rounded-full ring ring-secondary transition-colors duration-300 group-hover:bg-secondary">
              <Image
                src={ranking.poll.poll_answers[1].img}
                width={150}
                height={150}
              />
            </div>
          </div>
          <h1 className="mt-4 font-logo text-2xl font-normal uppercase">
            {ranking.poll.poll_answers[1]?.answer}
          </h1>
          <h2 className="text-sm text-gray-400">
            {ranking.poll.poll_answers[1]?.votes}
          </h2>
        </div>
        <div className="group col-start-3 row-start-2 flex cursor-pointer flex-col items-center transition-transform hover:scale-110">
          <div className="avatar ">
            <div className="rounded-full ring ring-twitterBlue transition-colors duration-300 group-hover:bg-twitterBlue">
              <Image
                src={ranking.poll.poll_answers[2].img}
                width={150}
                height={150}
              />
            </div>
          </div>
          <h1 className="mt-4 font-logo text-2xl font-normal uppercase">
            {ranking.poll.poll_answers[2]?.answer}
          </h1>
          <h2 className="text-sm text-gray-400">
            {ranking.poll.poll_answers[2]?.votes}
          </h2>
        </div>
      </div>
      <div className="md:1/2 card w-2/3 bg-white font-bold text-black lg:w-1/3">
        <div className="card-body">
          {ranking.poll.poll_answers.map((player, index) => (
            <div
              key={player._id}
              className={cl(
                "mb-4 flex cursor-pointer items-center justify-between rounded-md px-4 py-1 transition-colors ease-in-out hover:bg-twitchPurple hover:text-white",
                index <= 2 && "hidden"
              )}
            >
              <div className="flex items-center">
                <h3>{index + 1}</h3>
                <img
                  src={player.img}
                  alt={player.answer}
                  className="mask mask-circle mr-4 h-14 w-14"
                />
                <h3 className="uppercase">{player.answer}</h3>
              </div>

              <h3 className="font-normal ">{player.votes}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RankingPlayerSemana

export const getStaticPaths: GetStaticPaths = async () => {
  dbConnect()

  const getPlayerRankings = await RankingPlayer.find({})
  const playerRankings = await JSON.parse(JSON.stringify(getPlayerRankings))

  const paths = await playerRankings.map((rank: rankingPlayers) => ({
    params: {
      slug: rank.slug,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const getRanking = await RankingPlayer.find({ slug: params?.slug })
  const ranking = await JSON.parse(JSON.stringify(getRanking[0]))

  return {
    props: {
      ranking,
    },
  }
}
