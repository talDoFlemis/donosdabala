import mongoose from "mongoose"

const RankingPlayerSchema = new mongoose.Schema(
  {
    is_selected: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    week: {
      type: Number,
    },
    slug: {
      type: String,
    },
    playerOfWeek: {
      type: {
        name: { type: String },
        img: { type: String },
      },
    },
    poll: {
      type: {
        is_votable: { type: Number },
        total_votes: { type: Number },
        poll_answers: [
          {
            answer: { type: String },
            votes: { type: Number },
            img: { type: String },
          },
        ],
      },
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.models.RankingPlayer ||
  mongoose.model("RankingPlayer", RankingPlayerSchema)
