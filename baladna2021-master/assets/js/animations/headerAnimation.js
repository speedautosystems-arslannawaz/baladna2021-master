const headerAnimation = container => {

  const header_tl = gsap.timeline({
    // scrollTrigger: {
    //   trigger: ".assets_map",
    //   start: 'top 40%',
    //   end: 'center 10%',
    //   // markers: true,
    //   toggleActions: "restart pause resume pause",
    //   scrub: true,
    //   pin: true
    // },
    onComplete: () => { }
  });
  header_tl
    .addLabel("start");
  // if ($("body").attr("lang") == "en") {
  //   header_tl
  //     .to("#header-clip", { duration: 2, x: "91%", ease: "power4.inOut" }, "start+=0.1")
  //     .to(".header_a_shape", { duration: 2, x: "0%", ease: "power4.inOut" }, "start");
  // } else {
  //   header_tl
  //     // .set("#header-clip", { x: "-192%" })
  //     // .set(".header_a_shape", { x: "-192%" })
  //     .to("#header-clip", { duration: 2, x: "1%", ease: "power4.inOut" }, "start+=0.1")
  //     .to(".header_a_shape", { duration: 2, x: "0%", ease: "power4.inOut" }, "start");
  // }
  console.log('header aniamtoin');
  header_tl.to(".header-copy", { opacity: 1, duration: 2, ease: "power4.inOut", stagger: 0.1 }, "start")
    .to(".header-copy div", { letterSpacing: "0px", opacity: 1, duration: 2, ease: "power4.inOut", stagger: 0.1 }, "start")
    // .to(".outlined", { delay: 1, duration: 1, scale: 1.3, transformOrigin: '30% bottom;', ease: 'power3.easeOut' }, "start")
    ;

};
export default headerAnimation;