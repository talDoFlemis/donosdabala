import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"

export interface getStrawpollData {
  id: string
  poll: {
    is_votable: number
    poll_answers: [{ answer: string; id: string; votes: number }]
    total_votes: number
  }
  status: string
  title: string
}

export interface rankingTeams {
  _id: string
  is_votable: boolean
  is_selected: boolean
  slug: string
  week: number
  ranking: [
    {
      team_name: string
      team_image: string
      team_last_position: number
      team_votes_porcentage: number
      _id: string
    }
  ]
  createdAt: string
  updatedAt: string
}

export interface rankingPlayersData {
  data: [
    {
      _id: string
      id: string
      week: number
      slug: string
      playerOfWeek: {
        name: string
        img: string
        _id: string
      }
      poll: {
        is_votable: number
        total_votes: number
        poll_answers: [
          {
            answer: string
            _id: string
            votes: number
            img: string
            id: string
          }
        ]
        _id: string
      }
      title: string
      //SE VIER DO STRAWPOLL É ID se vier do mongo é _ID
      createdAt: string
      updatedAt: string
    }
  ]
}
export interface rankingPlayers {
  is_selected: boolean
  _id: string
  id: string
  week: number
  slug: string
  playerOfWeek: {
    name: string
    img: string
    _id: string
  }
  poll: {
    is_votable: number
    total_votes: number
    poll_answers: {
      answer: string
      _id: string
      votes: number
      img: string
      id: string
    }[]

    _id: string
  }
  title: string
  createdAt: string
  updatedAt: string
}

// TODO: Se algum dia tu pensar em usar o data, saiba que é um array de objects, não um object unico ou seja [0]

export interface tweetsDonosData {
  data: [
    {
      public_metrics?: {
        retweet_count: number
        reply_count: number
        like_count: number
        quote_count: number
      }
      text: string
      author_id: string
      created_at?: string
      possibly_sensitive: boolean
      id: string
      attachments?: {
        media_keys: [string]
      }
    }
  ]
  includes?: {
    users: [
      {
        profile_image_url: string
        created_at: string
        id: string
        name: string
        username: string
      }
    ]
    media: [
      {
        width: number
        type: string
        media_key: string
        preview_image_url: string
        url: string
        height: number
      }
    ]
  }
  meta?: {
    newest_id: string
    oldest_id: string
    result_count: number
    next_token: number
  }
}

export interface UserTypings {
  name: string
  email: string
  image?: string
}

export interface hltvPlayerRank {
  player: {
    name: string
    id: number
  }
  teams: [object]
  maps: number
  kdDiff: number
  rounds: number
  kd: number
  rating1: number
}

export interface powerRanking {
  attributes: {
    team: {
      team_info: {
        team_name: string
        team_position: number
        team_previous_positon: number
        team_image: {
          data: {
            attributes: {
              name: string
              height: number
              width: number
              url: string
            }
          }
        }
      }
      team_body: {
        team_pros: string
        team_cons: string
        team_anotations: string
      }
    }[]
    title: string
    week: number
    slug: string
  }
  id: number
}

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      email: string
    }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
  }
}
