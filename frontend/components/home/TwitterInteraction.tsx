import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { card, fadeInY } from "../../framerMotion/HomeVariants"
import { tweetsDonosData } from "../../typings"

interface Props {
  tweetsDonos: tweetsDonosData
}

function TwitterInteraction({ tweetsDonos }: Props) {
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
      className="flex min-h-[90vh] flex-col items-center justify-start bg-twitchPurple p-8"
    >
      <motion.h1
        initial="initial"
        animate={animationRef}
        variants={fadeInY("down", 0.5, 0)}
        className="headerLogoGradient from-yellow-300 via-yellow-300 to-red-600 text-center text-8xl"
      >
        Interacao com o Internauta
      </motion.h1>
      <motion.h1
        initial="initial"
        animate={animationRef}
        variants={fadeInY("down", 0.5, 0.3)}
        className="text-center font-Roboto text-4xl font-bold uppercase"
      >
        Não diga alô, diga alô donos da bala
      </motion.h1>
      <motion.div
        initial="initial"
        animate={animationRef}
        variants={card(1.2)}
        className="no-scrollbar card mx-auto mt-8 max-h-[50vh] overflow-y-auto border-2 border-[#1DA1F2] bg-black font-Oxigen md:max-w-xl"
      >
        {tweetsDonos.data.map((tweet, index) => (
          <div
            key={tweet.id}
            className="card-body flex flex-row items-start space-x-3 p-6 shadow-sm shadow-white"
          >
            <img
              src={
                tweetsDonos.includes?.users?.find(
                  (e) => e.id === tweet.author_id
                )?.profile_image_url
              }
              alt=""
              className="mask mask-circle "
            />
            <div>
              <div className="flex items-center justify-start space-x-3 text-base">
                <h1 className="font-bold">
                  {
                    tweetsDonos.includes?.users?.find(
                      (e) => e.id === tweet.author_id
                    )?.name
                  }
                </h1>
                <h2 className="text-gray-400">
                  @
                  {
                    tweetsDonos.includes?.users?.find(
                      (e) => e.id === tweet.author_id
                    )?.username
                  }{" "}
                  · {new Date(tweet.created_at as string).toLocaleString()}
                </h2>
              </div>
              <p>{tweet.text}</p>
              {tweetsDonos.includes?.media?.find(
                (e) => e.media_key === tweet.attachments?.media_keys[0]
              )?.type === "photo" && (
                <img
                  src={
                    tweetsDonos.includes?.media?.find(
                      (e) => e.media_key === tweet.attachments?.media_keys[0]
                    )?.url
                  }
                  alt=""
                  className="rounded-2xl"
                />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TwitterInteraction
