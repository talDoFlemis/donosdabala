import { Menu } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { motion } from "framer-motion"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  imageContainer,
  imageFloating,
  buttonContainer,
  buttonPopUp,
  card,
  fadeInHeader,
  fadeInY,
  staggerContainer,
} from "../../framerMotion/CommunityRankingVariants"
import RankingPlayer from "../../models/RankingPlayerModel"
import RankingTeams from "../../models/RankingTeamsModel"
import dbConnect from "../../utils/dbConnect"
interface Props {
  linksRankingPlayers: []
  linksRankingTeams: []
}

function index({ linksRankingPlayers, linksRankingTeams }: Props) {
  console.log(linksRankingTeams)
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex min-h-screen flex-col bg-[#14141b] p-8 text-drac_foreground"
    >
      <Link href="/">
        <a>
          <ArrowLeftIcon className=" h-8 w-8 cursor-pointer rounded-md transition-colors hover:bg-[#44202e] hover:text-[#f34b5a]" />
        </a>
      </Link>
      <motion.h1
        variants={fadeInHeader}
        className="text-center font-logo text-6xl md:text-8xl"
      >
        Rankings da Comunidade
      </motion.h1>
      <motion.div
        variants={fadeInY}
        className="mt-8 hidden justify-around md:inline-flex"
      >
        <h1 className="text-center font-logo text-6xl ">Jogadores</h1>
        <h1 className="text-center font-logo text-6xl ">Times</h1>
      </motion.div>
      <div className="my-auto mt-16 grid h-full w-full grid-cols-2 place-content-between gap-8">
        <div className="flex flex-col lg:flex-row">
          <motion.div
            initial="initial"
            animate="animate"
            variants={imageContainer}
            className="my-auto mx-auto"
          >
            <motion.div
              variants={imageFloating}
              className="relative h-full w-full"
            >
              <Image
                src="https://res.cloudinary.com/flemis/image/upload/v1644319742/donosDaBala/players/fallen.png"
                height={300}
                width={300}
              />
            </motion.div>
          </motion.div>
          <motion.div variants={card} className="card bg-drac_selection">
            <div className="card-body">
              <motion.div
                variants={fadeInY}
                className="card-title text-center font-logo text-4xl font-normal"
              >
                Escolha o Ranking
              </motion.div>
              <motion.div
                variants={buttonContainer}
                className="my-auto flex flex-wrap items-center justify-center"
              >
                {linksRankingPlayers?.map(({ slug, week }) => (
                  <Link href={`/community_ranking/players/${slug}`} key={week}>
                    <a>
                      <motion.button
                        variants={buttonPopUp}
                        className="btn m-2 bg-[#f34b5a] shadow-md hover:bg-red-700"
                      >
                        Semana {week}
                      </motion.button>
                    </a>
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-8">
          <motion.div variants={card} className="card bg-drac_selection">
            <div className="card-body">
              <motion.div
                variants={fadeInY}
                className="card-title text-center font-logo text-4xl font-normal"
              >
                Escolha o Ranking
              </motion.div>
              <motion.div
                variants={buttonContainer}
                className="my-auto flex flex-wrap items-center justify-center"
              >
                {linksRankingTeams?.map(({ slug, week }) => (
                  <Link href={`/community_ranking/teams/${slug}`} key={week}>
                    <a>
                      <motion.button
                        variants={buttonPopUp}
                        className="btn m-2 bg-twitchPurple shadow-md hover:bg-[#38235f]"
                      >
                        Semana {week}
                      </motion.button>
                    </a>
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={imageContainer}
            className="my-auto mx-auto"
          >
            <motion.div variants={imageFloating}>
              <Image
                src="https://res.cloudinary.com/flemis/image/upload/v1644324728/donosDaBala/teams/logoGrande/plano.png"
                width={300}
                height={200}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default index

export const getStaticProps: GetStaticProps = async () => {
  dbConnect()

  const respPlayers = await RankingPlayer.find({})
  const rankingPlayers = await JSON.parse(JSON.stringify(respPlayers))
  const linksRankingPlayers = rankingPlayers.map((ranking: any) => ({
    slug: ranking.slug,
    week: ranking.week,
  }))

  const respTeams = await RankingTeams.find({})
  const rankingTeams = await JSON.parse(JSON.stringify(respTeams))
  const linksRankingTeams = rankingTeams.map((ranking: any) => ({
    slug: ranking.slug,
    week: ranking.week,
  }))

  return {
    props: {
      linksRankingPlayers,
      linksRankingTeams,
    },
    revalidate: 3600,
  }
}
