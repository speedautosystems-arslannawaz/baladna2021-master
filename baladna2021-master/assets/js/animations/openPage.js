const openPage = container => {
  console.log('openPage', $(container));
  // gsap timeline
  const closeTimeline = gsap.timeline({
    onComplete: () => { console.log("open page complete"); }
  });
  // labels
  return closeTimeline.addLabel('start', 0)
    // .add(() => {
    // gsap.set(backCtrl, { pointerEvents: 'auto' })
    // gsap.set(itemsWrap, { pointerEvents: 'none' });
    // itemsInstanceArr[currentItem].DOM.article.classList.add('article--current');
    // }, 'articleOpening')
    // show the back button
    // .to(backCtrl, { duration: 0.7, opacity: 1 }, 'articleOpening')
    // .to(logo_inner, { duration: 0.7, opacity: 1 }, 'articleOpening')
    // initially hide all the article elements so we can animate them in
    .set([".article_title", ".article_number", ".article_intro", ".article_description"], {
      opacity: 0,
      y: '50%'
    })
    .set("nav", { opacity: 0 })
    .to("nav", {
      duration: 0.8,
      ease: 'power3',
      opacity: 1,
      // onComplete: () => gsap.set(frameEl, { pointerEvents: 'none' })
    }, 'start')
    .addLabel('articleOpening', "+=0")
    // // the image wrap and image elements will have opposite translate values (reveal/unreveal effect)
    .set(".article_img-wrap", { y: '100%' })
    .set(".article_img", { y: '-100%' })
    // now fade in and translate the article's elements
    .set(".article-wrap", { opacity: 1 })
    .to([".article_title", ".article_number", ".article_intro", ".article_description"], {
      duration: 2,
      ease: 'expo',
      opacity: 1,
      y: '0%',
      stagger: 0.04
    }, 'articleOpening')
    // // and reveal the image
    .to([".article_img-wrap", ".article_img"], {
      duration: 1,
      ease: 'expo',
      y: '0%'
    }, 'articleOpening');
};

export default openPage;