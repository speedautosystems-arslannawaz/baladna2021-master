const closePage = container => {
  console.log('closePage');
  // let item = $(container);
  // if (isAnimating) return;
  // isAnimating = true;

  // update currentItem index
  // currentItem = itemsInstanceArr.indexOf(item);

  // gsap timeline
  const closeTimeline = gsap.timeline({
    onComplete: () => {
      console.log("closePage complete");
    }
  });
  // labels
  return closeTimeline.addLabel('start', 0)
    .addLabel('showItems', 0.5)
    // .addLabel('showItems', typeT.out().totalDuration() * 0.7 + closeTimeline.labels.typeTransition);
    // .to(backCtrl, { duration: 0.7, ease: 'power1', opacity: 0 }, 'start')
    // .to(logo_inner, { duration: 0.7, ease: 'power1', opacity: 0 }, 'start')
    .to([".article_title", ".article_number", ".article_intro", ".article_description"], {
      duration: 1, ease: 'power4.in', opacity: 0, y: '50%', stagger: -0.04
    }, 'start')
    .to(".article_img-wrap", { duration: .8, ease: 'power4.in', y: '100%' }, 'start')
    .to(".article_img", { duration: .8, ease: 'power4.in', y: '-100%' }, 'start')
    .set(".article-wrap", { opacity: 0 }, ".article_img")
    .to("nav", {
      duration: 0.8, ease: 'power3', opacity: 0,
      // onStart: () => gsap.set(frameEl, {pointerEvents: 'auto'})
    }, 'showItems');


};

export default closePage;