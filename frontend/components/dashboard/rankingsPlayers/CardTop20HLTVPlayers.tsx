import useSWR from "swr"
import { hltvPlayerRank } from "../../../typings"
import cl from "clsx"

function CardTop20HLTVPlayers() {
  const { data: players } = useSWR("/api/admin/HLTV/players/AllPlayers")

  return (
    <div className="card row-span-2">
      <div className="card-body bg-drac_bg">
        <div className="card-title">Top 20 HLTV Atual</div>
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
            {players?.map((player: hltvPlayerRank, index: number) => (
              <tr
                className={cl(
                  "border-separate text-center hover:bg-accent",
                  index > 19 && "hidden"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CardTop20HLTVPlayers
