export const carouselVariants = (direction) => ({
  initial: { opacity: 0, x: direction === "right" ? -100 : 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 100 : -100,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
});
