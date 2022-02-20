import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import Head from "next/head"
import Image from "next/image"

//TODO: URGENTE CRIAR UMA NOVA POLL COM MAIS INFORMACOES PQ EU COLOQUEI SO O EMAIL

function login() {
  const { data: session } = useSession()
  return (
    <div className="min-h-screen bg-[#fa0035]">
      <Head>
        <title>Os Donos da Bala</title>
      </Head>
      <div className="flex max-h-[40vh] justify-center ">
        <Image src="/oldSchoolSkull.png" height={300} width={300} priority />
      </div>
      <div className="card mx-auto mt-4 min-h-[55vh] w-2/3 bg-black p-4 lg:w-1/2">
        <div className="card-body flex  flex-col items-center justify-around text-center uppercase text-white">
          <div>
            <div className="card-title font-logo text-6xl font-normal">
              PROIBIDO
            </div>
            <p className="font-Oxigen text-3xl font-bold">
              somente os escolhidos podem entrar nesse conteúdo questionável
            </p>
          </div>
          {!session ? (
            <button
              onClick={() => signIn("cognito", { callbackUrl: "/" })}
              className="w-1/2 rounded-md bg-[#fa0035] px-2 py-2 font-logo text-4xl tracking-wider text-black duration-300 ease-out hover:bg-[#910120] hover:text-white hover:shadow-lg hover:shadow-[#fa0035]"
            >
              DON'T CLICK
            </button>
          ) : (
            <button onClick={() => signOut()}>asdasd</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default login
