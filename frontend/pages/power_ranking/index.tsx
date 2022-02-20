import { gql } from "@apollo/client"
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/outline"
import { motion } from "framer-motion"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import IconLink from "../../components/dashboard/IconLink"
import {
  fadeInHeader,
  fadeInY,
  staggerContainer,
  buttonPopUp,
  card,
  buttonContainer,
  apokaoContainer,
  apokaoFloating,
} from "../../framerMotion/PowerRankingVariants"
import apokaCropped from "../../public/hostsImages/apokaCropped.png"
import { powerRanking } from "../../typings"
import apolloClient from "../../utils/apolloClient"

function PowerRankingIndex({ paths }: { paths: [] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex min-h-screen flex-col bg-drac_bg p-8 text-drac_foreground"
    >
      <Link href="/">
        <a>
          <ArrowLeftIcon className=" h-8 w-8 cursor-pointer rounded-md transition-colors hover:bg-[#44202e] hover:text-[#f34b5a]" />
        </a>
      </Link>
      <motion.h1
        variants={fadeInHeader}
        className="text-center font-logo text-8xl"
      >
        Power Ranking do Apoka
      </motion.h1>
      <div className="my-auto grid place-content-center md:grid-cols-2">
        <div className="mt-8 place-self-center self-center md:mt-0 xl:w-2/3">
          <motion.div variants={card} className="card bg-drac_selection">
            <div className="card-body">
              <motion.div
                variants={fadeInY}
                className="card-title text-center font-logo text-4xl font-normal"
              >
                Escolha o Power Ranking
              </motion.div>
              <motion.div
                variants={buttonContainer}
                className="flex flex-wrap items-center justify-around"
              >
                {paths?.map(({ slug, week }) => (
                  <Link href={`/power_ranking/${slug}`} key={week}>
                    <a>
                      <motion.button
                        variants={buttonPopUp}
                        className="btn bg-[#fb7d04] shadow-md hover:bg-[#fbad07]"
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
        <motion.div
          initial="initial"
          animate="animate"
          variants={apokaoContainer}
          className="mx-auto h-1/2 w-1/2"
        >
          <motion.div variants={apokaoFloating}>
            <Image
              src={apokaCropped}
              height={700}
              width={500}
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PowerRankingIndex

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        powerRankingApokaos {
          data {
            attributes {
              week
              slug
            }
          }
        }
      }
    `,
  })

  const paths = data.powerRankingApokaos.data.map(
    (rank: powerRanking) => rank.attributes
  )

  return {
    props: {
      paths,
    },
    revalidate: 3600,
  }
}
