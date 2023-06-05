const loading = container => {
  if ($(".loading").length > 0) {
    var lang = $('html').attr('lang');
    var split_target = ".copy .char";
    var stagger = .03;
    if (lang == 'ar') {
      split_target = ".copy .word";
      stagger = .2;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        // $(".loading").remove();
      }
    });
    tl.addLabel('start', 0)
      .set("body", { overflow: "hidden" })
      .set(".cover", { opacity: 1 })

      .from([".header_bg > div"], { duration: 1, opacity: 0, y: "10%", scale: .6, x: "0%", transformOrigin: "center bottom", ease: 'power4.inOut', stagger: .2 }, "start")
      // .from([".loading-hline1", ".loading-vline1", ".loading-hline2", ".loading-vline2"], { duration: 1, opacity: 0, x: "0%", transformOrigin: "center bottom", ease: 'power4.inOut', stagger: .2 })
      .addLabel('pic_reveald')

      .from([".loading_logo"], { duration: 2, opacity: 0, y: "-10%", transformOrigin: "center bottom", ease: 'power4.inOut' }, "pic_reveald-=1")
      .addLabel('logo_done')

      .from(split_target, { duration: 2, opacity: 0, y: 50, scale: 0, ease: 'power4.inOut', stagger: stagger }, "logo_done-=1")

      .addLabel('out', '+=1.5')
      .to([".loading_logo"], { duration: 1, opacity: 0, y: "-10%", transformOrigin: "center bottom", ease: 'power4.inOut' }, "out")
      .to([split_target], { duration: 1, opacity: 0, y: "-50px", scale: 0, ease: 'power4.inOut', stagger: .03 }, "out")
      .to([".header_bg > div"], { duration: .8, opacity: 0, scale: .8, y: "10%", x: "0%", transformOrigin: "center bottom", ease: 'power4.inOut', stagger: .05 }, "out+=1.5")
      .from([".loading-hline1", ".loading-vline1", ".loading-hline2", ".loading-vline2"], { duration: 1, opacity: 0, y: "10%", scale: .6, x: "0%", transformOrigin: "center bottom", ease: 'power4.inOut', stagger: .2 }, "start")
      .to([".cover"], { duration: .8, opacity: 0, ease: 'power4.inOut' }, "out+=2")

      .from([".copy .ar .word"], { duration: 2, opacity: 0, y: "-100%", ease: 'power4.inOut', stagger: .05 }, "logo_done")

      .call(() => { window.location.href = "overview.html" }, null, "+=.5");
  }
};
export default loading;