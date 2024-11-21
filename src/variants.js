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
    x: direction === "left" ? 30 : -30,
    transition: { duration: 0.3, type: "tween", ease: "easeInOut" },
  },
});
