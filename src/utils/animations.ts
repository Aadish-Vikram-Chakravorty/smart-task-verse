
export const STAGGERED_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.2, 0.8, 0.2, 1]
    }
  })
};

export const FADE_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

export const SCALE_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

export const SLIDE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};
