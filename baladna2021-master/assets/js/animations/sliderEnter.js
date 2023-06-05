
import { TypeTransition } from './typeTransition.js';
const typeT = new TypeTransition(document.querySelector('[data-type-transition]'));

const sliderEnter = container => {
  console.log('slider enter');
  // gsap timeline
  const closeTimeline = gsap.timeline({
    onComplete: () => {
      console.log('slider enter complete');
    }
  });

  // labels
  return closeTimeline.addLabel('start', 0)
    .addLabel('typeTransition', 2.5)
    .addLabel('showItems', typeT.out().totalDuration() * 0.7 + closeTimeline.labels.typeTransition)
    .set(".swiper", { overflow: "visible" })
    .set(".swiper-slide", { opacity: 0, y: (pos) => pos % 2 ? '25%' : '-25%' })
    .set("nav", { opacity: 0, })
    // text transition starts here
    .add(typeT.out().play(), 'start')
    // fade in the items
    .to(".swiper-slide", { duration: 1, ease: 'power3.inOut', opacity: 1, y: '0%' }, 'typeTransition')
    // fade in the page frame
    .to("nav", {
      duration: 0.8, ease: 'power3', opacity: 1,
      // onComplete: () => gsap.set(frameEl, { pointerEvents: 'none' })
    }, '.swiper-slider')
    .set(".swiper", { overflow: "hidden" });

}
export default sliderEnter;