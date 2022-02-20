import Image from "next/image"

import InstagramIcon from "../../public/socialMedia/instagram.svg"
import TwitterIcon from "../../public/socialMedia/twitter.svg"
import TwitchIcon from "../../public/socialMedia/twitch.svg"
import mchCropped from "../../public/hostsImages/mchCropped.png"
import apokaCropped from "../../public/hostsImages/apokaCropped.png"
import { motion, useAnimation } from "framer-motion"
import {
  staggerContainer,
  popupRotate,
  fadeInY,
  card,
} from "../../framerMotion/HomeVariants"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

function BioHosts() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const animationRef = useAnimation()
  useEffect(() => {
    if (inView) {
      animationRef.start("animate")
      if (!inView) {
        animationRef.start("initial")
      }
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className=" flex min-h-[90vh] flex-col items-center justify-around bg-twitchPurple  p-16 lg:p-8"
    >
      <motion.h1
        initial="initial"
        animate={animationRef}
        variants={fadeInY("down", 0.5, 0)}
        className="headerLogoGradient from-yellow-300 via-yellow-300 to-red-600 text-8xl"
      >
        Hosts
      </motion.h1>
      <div className="grid content-center justify-items-center gap-16 md:grid-cols-2">
        <div className="grid content-center justify-items-center gap-8 transition duration-300 ease-in-out lg:grid-cols-2 lg:hover:scale-105">
          <motion.div
            animate={animationRef}
            initial="initial"
            variants={staggerContainer(0)}
            className="flex flex-col items-center justify-center space-y-4 self-center"
          >
            <motion.div variants={popupRotate(0.5)}>
              <Image src={mchCropped} height={700} width={500} quality={100} />
            </motion.div>
            <motion.div variants={fadeInY("down", 0.5, 1)}>
              <ul className="flex space-x-4 ">
                <li>
                  <a href="https://twitch.tv/mch_agg">
                    <TwitchIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/mch_agg/">
                    <InstagramIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/mch_agg">
                    <TwitterIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            animate={animationRef}
            initial="initial"
            variants={card(1.2)}
            className="card self-center bg-neutral-focus shadow-2xl"
          >
            <div className="card-body items-center text-center lg:text-right">
              <div className="pb-2 font-logo text-4xl tracking-wider">
                Craque Michel
              </div>
              <p>
                Atualmente transmitindo o conteudo lider em Counter-Strike &
                VALORANT. Propagando ideias e o AGGLIFESTYLE.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="grid content-center justify-items-center gap-8 transition duration-300 ease-in-out lg:grid-cols-2 lg:hover:scale-105">
          <motion.div
            animate={animationRef}
            initial="initial"
            variants={card(1.2)}
            className="hidden self-center bg-neutral-focus shadow-2xl lg:card"
          >
            <div className="card-body items-center text-center lg:text-left">
              <div className="pb-2 font-logo text-4xl tracking-wider">
                Maestro Apoka
              </div>
              <p>
                CSGO Head Coach MIBR. CS player/coach/organizer since
                1999.Conteúdo focado em CSGO, Formula 1 e Esportes em geral
              </p>
            </div>
          </motion.div>
          <motion.div
            initial="initial"
            animate={animationRef}
            variants={staggerContainer(0)}
            className="flex flex-col items-center justify-center space-y-4 self-center overflow-hidden"
          >
            <motion.div variants={popupRotate(0.5)}>
              <Image
                src={apokaCropped}
                height={700}
                width={500}
                quality={100}
                className=""
              />
            </motion.div>
            <motion.div variants={fadeInY("down", 0.5, 1)}>
              <ul className="flex space-x-4 ">
                <li>
                  <a href="https://twitch.tv/ale_apoka">
                    <TwitchIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/ale_apoka/">
                    <InstagramIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ale_apoka">
                    <TwitterIcon className="cursor-pointer text-2xl text-white transition duration-300 hover:text-accent" />
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            animate={animationRef}
            initial="initial"
            variants={card(1.2)}
            className="card mb-8 bg-neutral-focus shadow-2xl md:mb-0 lg:hidden"
          >
            <div className="card-body items-center text-center lg:text-left">
              <div className="pb-2 font-logo text-4xl tracking-wider">
                Maestro Apoka
              </div>
              <p>
                CSGO Head Coach MIBR. CS player/coach/organizer since
                1999.Conteúdo focado em CSGO, Formula 1 e Esportes em geral
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BioHosts
