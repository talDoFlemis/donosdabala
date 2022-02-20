import mongoose from "mongoose"

const RankingTeamsSchema = new mongoose.Schema(
  {
    is_selected: {
      type: Boolean,
      required: true,
    },
    is_votable: { type: Boolean, required: true },
    slug: {
      type: String,
      required: true,
    },
    week: {
      type: Number,
      required: true,
    },
    ranking: [
      {
        team_name: {
          type: String,
          required: true,
        },
        team_image: {
          type: String,
          required: true,
        },
        team_last_position: {
          type: Number,
        },
        team_votes_porcentage: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.RankingTeams ||
  mongoose.model("RankingTeams", RankingTeamsSchema)
