import { Variants } from "framer-motion"

export const fadeInX = (direction: "left" | "right" = "left"): Variants => {
  return {
    initial: {
      x: direction === "left" ? -50 : 50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeInOut",
      },
    },
  }
}

export const fadeInY = (
  direction: "up" | "down" = "down",
  duration: number,
  delay: number
): Variants => {
  return {
    initial: {
      y: direction === "down" ? -50 : 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  }
}

export const fadeInLogoEntry: Variants = {
  initial: {
    y: -1000,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 1,
      type: "spring",
    },
  },
}

export const staggerContainer = (delayChildren: number): Variants => {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 1.2,
        delayChildren: delayChildren,
      },
    },
  }
}

export const card = (delay: number): Variants => {
  return {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        delay: delay,
        duration: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  }
}

export const popupRotate = (delayTime: number): Variants => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      scale: [0.5, 1.2, 1],
      opacity: 1,
      rotate: [10, -10, 0],
      transition: {
        delay: delayTime,
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }
}

export const cardContainer = (delay: number): Variants => {
  return {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        delay: delay,
        duration: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  }
}

export const scaleDownSpringOption = (multiplier: number): Variants => {
  return {
    initial: {
      opacity: 0,
      scale: 1.2,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1 * multiplier,
        type: "spring",
        damping: 10,
        stiffness: 110,
      },
    },
  }
}

export const choosenOnePopupRotate: Variants = {
  initial: {},
  animate: {
    y: [200, -200, 200],
    transition: { duration: 1.5, ease: "linear", repeat: Infinity },
  },
}

export const popUpRotateImageChoosenOne: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    scale: [0.5, 1.2, 1],
    transition: { delay: 0.8, duration: 0.3, type: "spring" },
  },
}
