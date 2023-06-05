const assets_map = container => {
  if (window.innerWidth > 768) {
    const assets_tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".assets_map",
        start: 'top 40%',
        end: 'center 10%',
        // markers: true,
        toggleActions: "restart pause resume pause",
        scrub: true,
        pin: true
      },
      onComplete: () => { }
    });
    if ($("body").attr("lang") == "en") {
      assets_tl
        .to(".assets_map", { duration: .5, scale: 1.4, transformOrigin: 'center right', x: "10%", ease: 'power3.easeOut' }, "-=.5");
    } else {
      assets_tl
        .to(".assets_map", { duration: .5, scale: 1.4, transformOrigin: 'center left', x: "10%", ease: 'power3.easeOut' }, "-=.5");
    }
  }

};
export default assets_map;