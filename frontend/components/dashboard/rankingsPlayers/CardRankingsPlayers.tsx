import React from "react"
import { LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline"
import { rankingPlayers } from "../../../typings"
import useSWR, { mutate } from "swr"
import axios from "axios"
import Link from "next/link"

function CardRankingsPlayers() {
  const { data: polls } = useSWR("/api/admin/strawpoll/")

  return (
    <div className="card col-span-2 row-start-2">
      <div className="card-body bg-drac_bg">
        <div className="card-title">
          Votações dos Melhores Jogadores da Semana
        </div>
        <table className="table-auto text-white">
          <thead>
            <tr>
              <th>Título</th>
              <th>Total de Votos</th>
              <th>Está Aberta?</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {polls?.map((poll: rankingPlayers) => (
              <Link href={`/ranking/players/${poll.slug}`} key={poll._id}>
                <tr
                  className="cursor-pointer text-center odd:bg-drac_bg even:bg-drac_bg2 hover:bg-accent"
                  key={poll._id}
                >
                  <td>{poll.title}</td>
                  <td>{poll.poll.total_votes}</td>
                  <td>{poll.poll.is_votable ? "aberta" : "fechada"}</td>
                  <td>
                    <div className="flex items-center justify-center space-x-4">
                      <a
                        href={`https://strawpoll.com/${poll.id}`}
                        data-tip="link strawpoll"
                        className="tooltip"
                      >
                        <LinkIcon className="h-6 w-6" />
                      </a>
                      <a
                        href={`https://strawpoll.com/edit/${poll.id}`}
                        data-tip="editar votação"
                        className="tooltip"
                      >
                        <PencilIcon className="h-6 w-6" />
                      </a>
                      <button
                        onClick={async () => {
                          mutate(
                            "/api/admin/strawpoll/",
                            polls.filter((e: any) => e._id !== poll.id),
                            false
                          )
                          const content_id = { content_id: poll.id }
                          await axios.delete("/api/admin/strawpoll", {
                            data: content_id,
                          })
                          mutate("/api/admin/strawpoll/")
                        }}
                        data-tip="remover votação"
                        className="tooltip"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CardRankingsPlayers
