import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import InstagramIcon from "../public/socialMedia/instagram.svg"
import GmailIcon from "../public/socialMedia/gmail.svg"
import GithubIcon from "../public/socialMedia/github.svg"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { motion } from "framer-motion"
import {
  apokaoContainer,
  card,
  fadeInHeader,
  fadeInY,
  staggerContainer,
} from "../framerMotion/PowerRankingVariants"

interface Props {
  user: {
    id: string
    avatarUrl: string
    url: string
    pinnedItems: {
      edges: {
        node: {
          id: string
          name: string
          url: string
          languages: {
            edges: {
              node: {
                color: string
                id: string
                name: string
              }[]
            }
          }
        }
      }[]
      totalCount: number
    }
  }
}

function DevContact({ user }: Props) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="flex h-screen flex-col bg-[#383a59] p-8 font-Roboto text-drac_foreground"
    >
      <Link href="/">
        <a>
          <ArrowLeftIcon className="h-8 w-8 cursor-pointer rounded-md transition-colors hover:bg-[#44202e] hover:text-[#f34b5a]" />
        </a>
      </Link>
      <motion.h1
        variants={fadeInHeader}
        className="text-center font-logo text-7xl text-white"
      >
        Contato do Desenvolvedor
      </motion.h1>
      <div className="my-auto mx-auto grid h-1/2 w-1/2 grid-cols-2 place-items-center gap-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={apokaoContainer}
          className="mx-auto flex h-full w-full flex-col items-center space-y-4"
        >
          <div className="mask mask-circle relative h-full w-full">
            <a href={user.url}>
              <Image
                src={user.avatarUrl}
                layout="fill"
                objectFit="contain"
                priority
              />
            </a>
          </div>
          <motion.div variants={fadeInY} className="flex space-x-4">
            <a href={user.url}>
              <GithubIcon className="text-4xl hover:text-[#f34b5a]" />
            </a>
            <a href="https://www.instagram.com/heyflemis/">
              <InstagramIcon className="text-4xl hover:text-[#f34b5a]" />
            </a>
            <CopyToClipboard text="coderflemis@gmail.com">
              <a
                data-tip="clique para copiar o email"
                className="tooltip tooltip-bottom"
              >
                <GmailIcon className="cursor-pointer text-4xl hover:text-[#f34b5a]" />
              </a>
            </CopyToClipboard>
          </motion.div>
        </motion.div>
        <motion.div variants={card} className="card bg-[#22212d] text-xl">
          <div className="card-body space-y-4 text-[#f4f466] ">
            <motion.div
              variants={fadeInY}
              className="card-title text-3xl text-white"
            >
              Olá, sou Said 👋
            </motion.div>
            <p className="text-left">
              Estudante de programação e fascinado por conteúdos premium como os
              da Tribo{" "}
              <span>
                <img src="/capaDaTribo.png" alt="capa" />
              </span>
            </p>
            <p>
              Começei a programar em novembro de 2021 e estou testando minhas
              habilidades em sites como os{" "}
              <span className="font-bold text-[#f34b5a]">Donos da Bala</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* <div className="card mx-auto w-2/3 bg-[#22212d]">
        <div className="card-body">
          <div className="card-title text-center">Projetos</div>
        </div>
      </div> */}
    </motion.div>
  )
}

//TODO: ADD PROJECT DPS

export default DevContact

export const getStaticProps: GetStaticProps = async () => {
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  const { data } = await client.query({
    query: gql`
      {
        user(login: "taldoflemis") {
          id
          pinnedItems(first: 10) {
            totalCount
            edges {
              node {
                ... on Repository {
                  id
                  name
                  url
                  languages(
                    first: 10
                    orderBy: { field: SIZE, direction: DESC }
                  ) {
                    edges {
                      node {
                        id
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
          avatarUrl
          url
        }
      }
    `,
  })

  return {
    props: {
      user: data.user,
    },
    revalidate: 3600,
  }
}
