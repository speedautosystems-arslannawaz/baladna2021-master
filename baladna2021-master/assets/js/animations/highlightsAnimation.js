const highlightsAnimation = container => {
  var sections = gsap.utils.toArray('.hbox');
  sections.forEach((section, i) => {
    gsap.to(section, 1, {
      scrollTrigger: {
        trigger: section,
        start: 'top 30%',
      },
      duration: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: Power4.easeOut
    })
  });
};
export default highlightsAnimation;