import Link from "next/link"
import axios from "axios"
import useSWR from "swr"
import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import IconLink from "../dashboard/IconLink"
import { Listbox } from "@headlessui/react"
import { powerRanking } from "../../typings"

function PowerRankingLayout({ children }: { children: React.ReactNode }) {
  // const [rankings, setRankings] = useState<powerRanking[]>([])
  const router = useRouter()

  const { data: rankings } = useSWR("/api/admin/powerRanking", (url: string) =>
    axios(url).then((r) => r.data)
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
      {children}
    </div>
  )
}

export default PowerRankingLayout
