import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import cl from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import IconLink from "../../../components/dashboard/IconLink"
import RankingPlayer from "../../../models/RankingPlayerModel"
import { rankingPlayers } from "../../../typings"
import dbConnect from "../../../utils/dbConnect"
import ApokaIcon from "../../../public/apokaIcon.png"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import {
  buttonPopUp,
  cardY,
  fadeInHeader,
  fadeInY,
  imageContainer,
  imageFloating,
  row,
  staggerContainer,
} from "../../../framerMotion/CommunityRankingVariants"

interface Props {
  ranking: rankingPlayers
  allRankingsSlugs: []
}

function RankingPlayerSemana({ ranking, allRankingsSlugs }: Props) {
  const router = useRouter()
  const currentRankingIndex = allRankingsSlugs?.findIndex(
    (e: any) => e === router.query.slug
  )
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex min-h-screen flex-col bg-[#11041d] text-drac_foreground"
    >
      <nav className="grid grid-cols-3 place-items-center p-2 md:mx-8">
        <div className="justify-self-start">
          <IconLink link="/community_ranking/" Icon={HomeIcon} text="Home" />
        </div>
        {allRankingsSlugs && (
          <div className="flex items-center space-x-4">
            {allRankingsSlugs[currentRankingIndex - 1] ? (
              <IconLink
                link={`/community_ranking/players/${
                  allRankingsSlugs[currentRankingIndex - 1]
                }`}
                Icon={ArrowLeftIcon}
              />
            ) : (
              <ArrowLeftIcon className="m-2 h-8 w-8 text-gray-500" />
            )}
            <h1 className="text-center text-xl md:text-3xl">
              Semana {ranking.week}
            </h1>
            {allRankingsSlugs[currentRankingIndex + 1] ? (
              <IconLink
                link={`/community_ranking/players/${
                  allRankingsSlugs[currentRankingIndex + 1]
                }`}
                Icon={ArrowRightIcon}
              />
            ) : (
              <ArrowRightIcon className="m-2 h-8 w-8 text-gray-500" />
            )}
          </div>
        )}
        <div className="justify-self-end">
          <Link href="power_ranking">
            <div className="flex cursor-pointer flex-col items-center rounded-md p-2 hover:bg-[#44202e] hover:text-[#f34b5a]">
              <div>
                <Image src={ApokaIcon} width={50} height={50} />
              </div>
              <h3 className="hidden md:inline-flex">Power Ranking</h3>
            </div>
          </Link>
        </div>
      </nav>
      <motion.h1
        variants={fadeInHeader}
        className="text-center font-logo text-7xl"
      >
        Ranking dos Jogadores
      </motion.h1>

      <div className="mx-auto mb-8 grid h-[40vh] grid-cols-3 lg:w-1/2">
        <motion.div
          variants={imageContainer}
          className="self-end justify-self-center"
        >
          <Image
            src={ranking.poll.poll_answers[1].img}
            height={150}
            width={150}
          />
          <motion.h1
            variants={fadeInY}
            className="text-center font-logo text-2xl"
          >
            {ranking.poll.poll_answers[1].answer}
          </motion.h1>
          <motion.h2
            variants={fadeInY}
            className="text-center text-xl text-gray-300"
          >
            {ranking.poll.poll_answers[1].votes}
          </motion.h2>
        </motion.div>
        <motion.div variants={imageContainer} className="place-self-center">
          <motion.div variants={imageFloating}>
            <Image
              src={ranking.poll.poll_answers[0].img}
              height={170}
              width={170}
            />
          </motion.div>
          <motion.h1
            variants={fadeInY}
            className="text-center font-logo text-3xl"
          >
            {ranking.poll.poll_answers[0].answer}
          </motion.h1>
          <motion.h2
            variants={fadeInY}
            className="text-center text-xl text-gray-300"
          >
            {ranking.poll.poll_answers[0].votes}
          </motion.h2>
        </motion.div>
        <motion.div
          variants={imageContainer}
          className="self-end justify-self-center"
        >
          <Image
            src={ranking.poll.poll_answers[2].img}
            height={150}
            width={150}
          />
          <motion.h1
            variants={fadeInY}
            className="text-center font-logo text-2xl"
          >
            {ranking.poll.poll_answers[2].answer}
          </motion.h1>
          <motion.h2
            variants={fadeInY}
            className="text-center text-xl text-gray-300"
          >
            {ranking.poll.poll_answers[2].votes}
          </motion.h2>
        </motion.div>
      </div>
      <motion.div
        variants={cardY}
        className="md:1/2 card mx-auto w-2/3 bg-white font-bold text-black lg:w-1/3"
      >
        <div className="card-body">
          {ranking.poll.poll_answers.map((player, index) => (
            <motion.div
              variants={row}
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

  const getAllRankings = await RankingPlayer.find({})
  const allRankings = await JSON.parse(JSON.stringify(getAllRankings))
  const allRankingsSlugs = allRankings.map((rank: any) => rank.slug)

  return {
    props: {
      ranking,
      allRankingsSlugs,
    },
  }
}
