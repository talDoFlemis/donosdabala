import { PencilIcon } from "@heroicons/react/outline"
import Link from "next/link"
import React from "react"
import useSWR from "swr"
import TailSpin from "../../../public/tail-spin.svg"
import { rankingTeams } from "../../../typings"

function CardCommunityTeamsRanking() {
  const { data: teamsRankings } = useSWR("/api/admin/teams")

  return (
    <div className="card col-span-2">
      <div className="card-body bg-drac_bg">
        <div className="card-title">Rankings da Comunidade</div>
        {!teamsRankings ? (
          <div className="m-auto">
            <TailSpin className="text-6xl text-[#f34b5a]" />
          </div>
        ) : (
          <table className="table-auto text-white">
            <thead>
              <tr>
                <th>Título</th>
                <th>Vencedor</th>
                <th>Está Aberta?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {teamsRankings?.map((ranking: rankingTeams) => (
                <Link href={`/ranking/teams/${ranking.slug}`} key={ranking._id}>
                  <tr className="cursor-pointer text-center odd:bg-drac_bg even:bg-drac_bg2 hover:bg-accent">
                    <td>Ranking da Semana {ranking.week}</td>
                    <td>{ranking.ranking[0].team_name.toUpperCase()}</td>
                    <td>{ranking.is_votable ? "aberta" : "fechada"}</td>
                    <td>
                      <a
                        href={`https://strawpoll.com/edit/${ranking._id}`}
                        data-tip="editar votação"
                        className="tooltip"
                      >
                        <PencilIcon className="h-6 w-6" />
                      </a>
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CardCommunityTeamsRanking
