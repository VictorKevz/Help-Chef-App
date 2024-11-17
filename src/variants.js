export const carouselVariants = (direction) => ({
  initial: { opacity: 0, x: direction === "right" ? -100 : 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 20 : -20,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
});
