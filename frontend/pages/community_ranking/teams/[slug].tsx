import { GetStaticPaths, GetStaticProps } from "next"
import RankingTeams from "../../../models/RankingTeamsModel"
import { rankingTeams } from "../../../typings"
import dbConnect from "../../../utils/dbConnect"
import cl from "clsx"
import Image from "next/image"
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
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
import IconLink from "../../../components/dashboard/IconLink"

interface Props {
  ranking: rankingTeams
  allRankingsSlugs: any
}

function RankingTeamsSemana({ ranking, allRankingsSlugs }: Props) {
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
                link={`/community_ranking/teams/${
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
                link={`/community_ranking/teams/${
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
        Ranking dos Times
      </motion.h1>

      <div className="mx-auto my-8">
        <motion.div variants={imageContainer}>
          <motion.div variants={imageFloating}>
            <div>
              <Image
                src={ranking.ranking[0].team_image}
                height={300}
                width={300}
              />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInY}
            className="text-center font-logo text-5xl"
          >
            {ranking.ranking[0].team_name}
          </motion.h1>
          <motion.h2 variants={fadeInY} className="text-center text-4xl">
            {ranking.ranking[0].team_votes_porcentage} %
          </motion.h2>
        </motion.div>
      </div>
      <motion.div
        variants={cardY}
        className="md:1/2 card mx-auto w-2/3 bg-white font-bold text-black lg:w-1/3"
      >
        <div className="card-body">
          {ranking.ranking.map((team, index) => (
            <motion.div
              variants={row}
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

  const getAllRankings = await RankingTeams.find({})
  const allRankings = await JSON.parse(JSON.stringify(getAllRankings))
  const allRankingsSlugs = allRankings.map((rank: any) => rank.slug)

  return {
    props: {
      ranking,
      allRankingsSlugs,
    },
  }
}
