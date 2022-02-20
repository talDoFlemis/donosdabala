import Image from "next/image"
import Link from "next/link"

function stop() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fa0035] text-center text-white">
      <div className="card bg-black">
        <div className="card-body space-y-2">
          <div className="card-title font-logo text-6xl font-normal">
            PARE IMEDIATAMENTE
          </div>

          <div>
            <Image
              src="/batataArma.jpeg"
              width={408}
              height={403}
              className="mask mask-squircle"
              priority
            />
          </div>
          <p className="text-4xl font-bold uppercase">
            você foi pego pelo btt holdando base!
          </p>
          <p className="text-3xl font-bold uppercase">
            volte para a página inicial
          </p>
          <Link href="/">
            <button className="mx-auto w-1/2 rounded-md bg-[#fa0035] px-2 py-2 font-logo text-4xl tracking-wider text-black duration-300 ease-out hover:bg-[#910120] hover:text-white hover:shadow-lg hover:shadow-[#fa0035] ">
              eu me rendo
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default stop
