import { hltvPlayerRank } from "../../../typings"
import cl from "clsx"
import useSWR from "swr"
import TailSpin from "../../../public/tail-spin.svg"

function CardBestBrazillianPlayers() {
  const { data: BrazilianPlayers } = useSWR(
    "/api/admin/HLTV/players/BrazilianPlayers"
  )

  return (
    <div className="card bg-drac_bg shadow-lg">
      <div className="card-body">
        <div className="card-title">Ranking HLTV Jogadores 🇧🇷</div>
        {!BrazilianPlayers ? (
          <div className="m-auto">
            <TailSpin className="text-6xl text-[#f34b5a]" />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>K-D Diff</th>
                <th>KD</th>
                <th>Rating HLTV</th>
              </tr>
            </thead>
            <tbody>
              {BrazilianPlayers?.players.map(
                (player: hltvPlayerRank, index: number) => (
                  <tr
                    className={cl(
                      "border-separate text-center hover:bg-accent",
                      index > 9 && "hidden"
                    )}
                    key={player.player.id}
                  >
                    <td>
                      <a
                        href={`https://www.hltv.org/stats/players/${player.player.id}/${player.player.name}`}
                      >
                        {index + 1} - {player.player.name}
                      </a>
                    </td>
                    <td>{player.kdDiff}</td>
                    <td>{player.kd}</td>
                    <td>{player.rating1}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CardBestBrazillianPlayers
