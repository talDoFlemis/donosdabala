import Image from "next/image"
import mchCropped from "../../public/hostsImages/mchCropped.png"
import apokaCropped from "../../public/hostsImages/apokaCropped.png"
import { motion } from "framer-motion"
import {
  fadeInLogoEntry,
  fadeInX,
  fadeInY,
  staggerContainer,
} from "../../framerMotion/HomeVariants"

function EntryPage() {
  return (
    <div className="bgWallBrickDarken grid min-h-[90vh]  content-center justify-items-center bg-local px-16 lg:grid-cols-5">
      <div className="hidden self-center transition duration-300 ease-in-out hover:scale-110 lg:inline-grid">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInX("left")}
          className="tooltip tooltip-primary"
          data-tip="Craque MCH"
        >
          <a href="https://twitch.tv/mch_agg">
            <Image
              src={mchCropped}
              height={700}
              width={500}
              quality={100}
              priority
            />
          </a>
        </motion.div>
      </div>
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer(1)}
        className="flex flex-col items-center space-y-8 self-center text-center md:col-span-3"
      >
        <motion.div
          variants={fadeInLogoEntry}
          className=" font-logo text-8xl shadow-lg"
        >
          <h1>OS DONOS</h1>
          <h1 className="headerLogoGradient from-yellow-300 to-red-500">
            DA BALA
          </h1>
        </motion.div>
        <motion.div
          variants={fadeInY("down", 0.5, 2)}
          className="font-logo text-4xl tracking-wider"
        >
          <p>
            Seu <span className="font-bold text-red-500">compromisso </span>
            semanal de toda segunda
          </p>
        </motion.div>
      </motion.section>
      <div className="hidden self-center transition duration-300 ease-in-out hover:scale-110 lg:inline-grid">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInX("right")}
          className="tooltip tooltip-primary "
          data-tip="Maestro APOKA"
        >
          <a href="https://twitch.tv/ale_apoka">
            <Image
              src={apokaCropped}
              height={700}
              width={500}
              quality={100}
              priority
            />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default EntryPage
