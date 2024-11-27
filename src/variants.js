export const carouselVariants = (direction) => ( {
  initial: { opacity: 0, x: direction === "left" ? -50 : 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 20 : -20,
    transition: { duration: 0.3, type: "tween", ease: "easeInOut" },
  },
});

export const productCardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delay: 0.2 * i,
      ease: "easeInOut",
      duration: 0.6,
    },
  }),
  exit: {
    opacity: 0.5,
    y: 100,
    scale: 0.5,

    transition: {
      type: "tween",
      delay: 0.15,
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export const sideVariants = (direction) => ( {
  initial: {
     opacity: 0, 
     x: direction === "left" ? -100 : 100,
    },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.7,
      delay:0.2
    },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 20 : -20,

    transition: { duration: 0.2, type: "tween", ease: "easeInOut" },
  },
});


export const verticalVariants = (direction) => ( {
  initial: {
     opacity: 0, 
     y: direction === "top" ? 100 : -100,
    },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.7,
      delay:0.2
    },
  },
  exit: {
    opacity: 0,
    y: direction === "top" ? -20 : 20,

    transition: { duration: 0.2, type: "tween", ease: "easeInOut" },
  },
});