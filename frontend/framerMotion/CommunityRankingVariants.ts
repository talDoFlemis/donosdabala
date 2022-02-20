import { Variants } from "framer-motion"

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.3,
    },
  },
}

export const fadeInHeader: Variants = {
  initial: {
    y: "-25vh",
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

export const card: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      delayChildren: 0.2,
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

export const fadeInY: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
}

export const buttonContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const buttonPopUp: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
}

export const imageContainer: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: [10, 0],
    transition: {
      delay: 0.7,
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export const imageFloating: Variants = {
  initial: {},
  animate: {
    y: [0, -30, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
}
