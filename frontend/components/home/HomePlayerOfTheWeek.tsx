import { rankingPlayers } from "../../typings"
import cl from "clsx"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import {
  cardContainer,
  choosenOnePopupRotate,
  fadeInY,
  popUpRotateImageChoosenOne,
  scaleDownSpringOption,
} from "../../framerMotion/HomeVariants"

interface Props {
  rankingPlayersThisWeek: rankingPlayers
}

function HomePlayerOfTheWeek({ rankingPlayersThisWeek }: Props) {
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
    <div ref={ref} className="min-h-[90vh] p-8 text-center">
      <motion.h1
        initial="initial"
        animate={animationRef}
        variants={fadeInY("down", 0.5, 0)}
        className="headerLogoGradient mb-8 from-yellow-300 via-yellow-300 to-red-600 text-8xl"
      >
        Jogador da Semana
      </motion.h1>
      <div className="grid place-content-center gap-8 overflow-hidden md:grid-cols-2">
        <motion.div
          initial="initial"
          animate={animationRef}
          variants={cardContainer(0.4)}
          className="card self-center bg-neutral-focus md:w-full md:place-self-end lg:w-3/5"
        >
          <div className="card-body">
            <motion.h1
              variants={fadeInY("down", 0.3, 0.5)}
              initial="initial"
              animate={animationRef}
              className="font-logo text-4xl font-normal uppercase tracking-wider"
            >
              {rankingPlayersThisWeek.playerOfWeek.name}
            </motion.h1>
            {rankingPlayersThisWeek.poll.is_votable === 1 ? (
              <motion.p
                variants={fadeInY("down", 0.3, 0.7)}
                className="flex items-center justify-center text-base text-green-400"
              >
                <span className="badge mr-2 bg-green-400"></span>Votação aberta
              </motion.p>
            ) : (
              <motion.p
                variants={fadeInY("down", 0.3, 0.7)}
                className="flex items-center justify-center text-base text-red-500"
              >
                <span className="badge mr-2 bg-red-500 "></span>
                Votação fechada
              </motion.p>
            )}
            {rankingPlayersThisWeek.poll.poll_answers.map(
              (pollAnswer, index) => (
                <div
                  key={pollAnswer._id}
                  className={cl(
                    "my-2 flex cursor-pointer justify-between rounded-full py-1 px-4 font-bold uppercase transition-transform ease-in-out hover:scale-105",
                    rankingPlayersThisWeek.playerOfWeek.name ===
                      pollAnswer.answer
                      ? "bg-accent text-white"
                      : "bg-white text-black"
                  )}
                >
                  <div>
                    {index + 1} - {pollAnswer.answer}
                  </div>
                  <div>
                    {(
                      (pollAnswer.votes /
                        rankingPlayersThisWeek.poll.total_votes) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          animate={animationRef}
          variants={popUpRotateImageChoosenOne}
          className="place-self-start"
        >
          <motion.div
            variants={choosenOnePopupRotate}
            className="place-self-start transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <Image
              src={rankingPlayersThisWeek.playerOfWeek.img}
              width={400}
              height={400}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePlayerOfTheWeek
