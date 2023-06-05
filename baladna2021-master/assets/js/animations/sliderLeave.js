
import { TypeTransition } from './typeTransition.js';
const typeT = new TypeTransition(document.querySelector('[data-type-transition]'));

const sliderLeave = item => {
  console.log('slider leave');
  // gsap timeline
  const openTimeline = gsap.timeline({
    onComplete: () => {
      console.log('slider leave complete');
    }
  });

  // labels
  return openTimeline.addLabel('start', 0)
    // type transition starts a bit after the items animation
    .addLabel('typeTransition', 0.5)
    // the article will show a bit before the text transition ends
    // .addLabel('articleOpening', typeT.in().totalDuration() * .75 + openTimeline.labels.typeTransition)

    .set(".swiper", { overflow: "visible" })
    // fade out the items
    .to(".swiper-slide", {
      duration: 0.8,
      ease: 'power2.inOut',
      opacity: 0,
      y: (pos) => pos % 2 ? '25%' : '-25%'
    }, 'start')

    // fade out the page frame
    .to("nav", {
      duration: 0.8,
      ease: 'power3',
      opacity: 0,
      // onComplete: () => gsap.set(frameEl, { pointerEvents: 'none' })
    }, 'start')

    // text transition starts here
    .add(typeT.in().play(), 'typeTransition')
    .set(".swiper", { overflow: "hidden" });

}
export default sliderLeave;