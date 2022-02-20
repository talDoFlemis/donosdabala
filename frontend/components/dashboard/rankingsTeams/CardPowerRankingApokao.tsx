import useSWR from "swr"
import TailSpin from "../../../public/tail-spin.svg"
import { useState } from "react"
import { powerRanking } from "../../../typings"

function CardPowerRankingApokao() {
  const { data: powerRanking } = useSWR("/api/admin/powerRanking/")
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="card col-span-2">
      <div className="card-body bg-drac_bg">
        <div className="card-title flex justify-between">
          <h1>Power Ranking do Apokao</h1>
          <button
            className="btn bg-[#ff9405] hover:bg-[#fa7f0d]"
            onClick={() => {
              setModalOpen(!modalOpen)
            }}
          >
            Criar Power Ranking
          </button>
        </div>
        {!powerRanking ? (
          <div className="m-auto">
            <TailSpin className="text-6xl text-[#f34b5a]" />
          </div>
        ) : (
          <div>
            {powerRanking?.map((ranking: powerRanking) => (
              <h1 key={ranking.id}>{ranking.attributes.title}</h1>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardPowerRankingApokao
