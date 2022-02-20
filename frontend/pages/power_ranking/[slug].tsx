import { GetStaticPaths, GetStaticProps } from "next"
import { gql } from "@apollo/client"
import { powerRanking } from "../../typings"
import apolloClient from "../../utils/apolloClient"
import cl from "clsx"
import axios from "axios"
import useSWR from "swr"
import { useRouter } from "next/router"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import IconLink from "..//../components/dashboard/IconLink"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-creative"
import "swiper/css/mousewheel"
import {
  Mousewheel,
  Navigation,
  Pagination,
  Keyboard,
  EffectCreative,
} from "swiper"
import Image from "next/image"

interface Props {
  getRanking: powerRanking
}

function PowerRankingApokao({ getRanking }: Props) {
  const router = useRouter()
  const { data: rankings } = useSWR(
    "/api/ranking/powerRanking",
    (url: string) => axios(url).then((r) => r.data)
  )
  const currentRankingIndex = rankings?.findIndex(
    (e: powerRanking) => e.attributes.slug === router.query.slug
  )

  return (
    <div className="bg-drac_bg font-Roboto text-drac_foreground">
      <nav className="grid h-[10vh] grid-cols-3 place-items-center p-2 md:mx-8">
        <div className="justify-self-start">
          <IconLink link="/power_ranking/" Icon={HomeIcon} text="Home" />
        </div>
        {rankings && (
          <div className="flex items-center space-x-4">
            {rankings[currentRankingIndex - 1] ? (
              <IconLink
                link={`/power_ranking/${
                  rankings[currentRankingIndex - 1].attributes.slug
                }`}
                Icon={ArrowLeftIcon}
              />
            ) : (
              <ArrowLeftIcon className="m-2 h-8 w-8 text-gray-500" />
            )}
            <h1 className="text-center text-xl md:text-3xl">
              Semana {rankings[currentRankingIndex]?.attributes.week}
            </h1>
            {rankings[currentRankingIndex + 1] ? (
              <IconLink
                link={`/power_ranking/${
                  rankings[currentRankingIndex + 1].attributes.slug
                }`}
                Icon={ArrowRightIcon}
              />
            ) : (
              <ArrowRightIcon className="m-2 h-8 w-8 text-gray-500" />
            )}
          </div>
        )}
        <div className="justify-self-end">
          <IconLink
            link="/community_ranking"
            Icon={UserGroupIcon}
            text="Rankings da Comunidade"
          />
        </div>
      </nav>
      <div className="mx-auto overflow-hidden">
        <Swiper
          grabCursor={true}
          effect="creative"
          creativeEffect={{
            prev: {
              translate: [0, 0, -800],
              rotate: [180, 0, 0],
            },
            next: {
              translate: [0, 0, -800],
              rotate: [-180, 0, 0],
            },
          }}
          keyboard={{
            enabled: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCreative, Pagination, Navigation, Keyboard]}
          className="h-[90vh] bg-drac_bg"
        >
          {getRanking?.attributes.team.map((team) => (
            <SwiperSlide key={team.team_info.team_name}>
              <Swiper
                direction={"vertical"}
                mousewheel={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Mousewheel]}
                className="h-[90vh]"
              >
                <SwiperSlide className="flex flex-col justify-around p-8">
                  <div className="flex items-center justify-end space-x-8 text-right text-5xl">
                    {team.team_info.team_position}
                    {team.team_info.team_previous_positon -
                      team.team_info.team_position !==
                    0 ? (
                      <div className="flex items-center self-start text-3xl">
                        <div
                          className={cl(
                            "badge badge-lg",
                            team.team_info.team_previous_positon -
                              team.team_info.team_position <
                              0
                              ? "mask mask-triangle-2 bg-drac_red"
                              : "mask mask-triangle bg-drac_green"
                          )}
                        ></div>
                        <h1>
                          {team.team_info.team_previous_positon -
                            team.team_info.team_position}
                        </h1>
                      </div>
                    ) : (
                      <div className="badge badge-lg"></div>
                    )}
                  </div>
                  <div className="relative mx-auto h-1/2 w-1/2">
                    <Image
                      src={team.team_info.team_image.data.attributes.url}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h1 className="text-center font-logo text-6xl uppercase">
                    {team.team_info.team_name}
                  </h1>
                </SwiperSlide>
                {team.team_body?.team_pros && (
                  <SwiperSlide className="flex flex-col p-8">
                    <h1 className="text-center font-logo text-5xl">PROS</h1>
                    <div className="my-auto flex flex-col text-3xl">
                      {team.team_body.team_pros
                        .split("\n")
                        .map((pro, index) => (
                          <p key={index}>{pro}</p>
                        ))}
                    </div>
                  </SwiperSlide>
                )}
                {team.team_body?.team_cons && (
                  <SwiperSlide className="flex flex-col p-8">
                    <h1 className="text-center font-logo text-5xl">CONTRAS</h1>
                    <div className="my-auto flex flex-col text-3xl">
                      {team.team_body.team_cons
                        .split("\n")
                        .map((con, index) => (
                          <p key={index}>{con}</p>
                        ))}
                    </div>
                  </SwiperSlide>
                )}
                {team.team_body?.team_anotations && (
                  <SwiperSlide className="flex flex-col p-8">
                    <h1 className="text-center font-logo text-5xl">
                      ANOTAÇÕES
                    </h1>
                    <div className="my-auto flex flex-col text-3xl">
                      {team.team_body.team_anotations
                        .split("\n")
                        .map((anotation, index) => (
                          <p key={index}>{anotation}</p>
                        ))}
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default PowerRankingApokao

// PowerRankingApokao.PageLayout = PowerRankingLayout

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        powerRankingApokaos {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  })

  const paths = data.powerRankingApokaos.data.map((ranking: powerRanking) => ({
    params: {
      slug: ranking.attributes.slug,
    },
  }))

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: gql`
    query {
      powerRankingApokaos(
        pagination: { start: 0, limit: 15 }
        filters: { slug: { eq: "${params?.slug}" } }
      ) {
        data {
          id
          attributes {
            title
            slug
            week
            team {
              team_info {
                id
                team_name
                team_position
                team_previous_positon
                team_image {
                  data {
                    attributes {
                      name
                      height
                      width
                      url
                    }
                  }
                }
              }
              team_body {
                id
                team_pros
                team_cons
                team_anotations
              }
            }
          }
        }
      }
    }
      `,
  })

  const getRanking = data.powerRankingApokaos.data[0]

  return {
    props: {
      getRanking,
    },
  }
}
