import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="sticky top-0 z-50 max-h-[10vh] w-full bg-black p-2 font-bold text-white shadow-md shadow-accent">
      <div className="navbar mx-auto  max-w-7xl justify-between">
        <div className="flex space-x-8">
          <Link href="/">
            <a>
              <Image src="/bulletsDonos.png" height={50} width={50} />
            </a>
          </Link>
          <Link href="/community_ranking/">
            <a className="cursor-pointer transition duration-300 hover:text-[#fa0035]">
              Rankings da Comunidade
            </a>
          </Link>
          <Link href="/power_ranking/">
            <a className="cursor-pointer transition duration-300 hover:text-[#fa0035]">
              Power Ranking
            </a>
          </Link>
          <Link href="/dev_contact">
            <a className="cursor-pointer transition duration-300 hover:text-[#fa0035]">
              Dev Contact
            </a>
          </Link>
        </div>
        {/* TODO: Fazer todo a estrutura pra mostrar o hamburguer quando tiver antes do md screen */}
        <div className="items-center space-x-4 md:inline-flex">
          {session ? (
            <div>
              <h1>BEM VINDO MEU EMBAIXADOR</h1>
              <Link href="/admin/dashboard">Dashboard</Link>
            </div>
          ) : (
            <Link href="/login">
              <button className="flex items-center rounded-md bg-[#fa0035] px-2 py-1 font-logo text-xl tracking-wider text-black duration-300 ease-out hover:bg-[#910120] hover:text-white hover:shadow-lg hover:shadow-[#fa0035]">
                <Image
                  src="/oldSchoolSkull.png"
                  height={30}
                  width={30}
                  priority
                />
                <h1 className=" ml-2">PROIBIDO</h1>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
// fazer tipo a netflix botar o home e essas paradas na parte esquerda e deixa tudo de login na direita
export default Navbar
