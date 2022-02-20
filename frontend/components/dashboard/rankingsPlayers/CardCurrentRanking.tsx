import Image from "next/image"
import useSWR from "swr"
import { rankingPlayers } from "../../../typings"
import TailSpin from "../../../public/tail-spin.svg"

function CardCurrentRanking() {
  const { data: polls } = useSWR("/api/admin/strawpoll/")
  const currentRanking: rankingPlayers = polls?.find(
    (e: any) => e.is_selected === true
  )

  if (!polls) {
    return (
      <h1>
        <TailSpin className="text-[#f34b5a]" />
      </h1>
    )
  }
  return (
    <div className="card shadow-xl">
      <div className="card-body bg-drac_bg">
        <div className="card-title">Ranking Atual do Chat</div>
        {currentRanking?.poll.poll_answers.map((player, index: number) => (
          <div
            className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-accent"
            key={player._id}
          >
            <div className="flex space-x-2">
              <h1>{index + 1} -</h1> <h1>{player.answer}</h1>
            </div>
            <h1>
              {(
                (player.votes / currentRanking?.poll.total_votes) *
                100
              ).toFixed(2)}{" "}
              %
            </h1>
          </div>
        ))}
        <div className="mx-auto">
          <Image
            src={currentRanking?.playerOfWeek.img as string}
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  )
}

export default CardCurrentRanking
