(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.querySelector(".stage");
  const can = document.querySelector(".product-wrap");
  const storyCopy = document.querySelector(".story-copy");

  if (!stage || !can) return;

  if (prefersReducedMotion) return;

  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add("motion-fallback");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("js-ready");

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(".topbar", { autoAlpha: 1, duration: 0.7 }, 0)
    .to(".hero-copy > .eyebrow", { autoAlpha: 1, y: 0, duration: 0.55 }, 0.12)
    .to(".headline-line > span", { y: "0%", duration: 0.95, stagger: 0.14 }, 0.18)
    .to(".hero-note", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.72)
    .from(".sunburst, .orbit", { scale: 0.8, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.12)
    .from(can, { y: 36, autoAlpha: 0, rotation: -8, duration: 1.1 }, 0.25)
    .to(".scroll-cue, .flavour-note", { autoAlpha: 1, duration: 0.5 }, 0.85)
    .to(".stat", { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 }, 0.95);

  gsap.timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true
    }
  })
    .to(can, { x: () => window.innerWidth < 700 ? -window.innerWidth * 0.18 : -window.innerWidth * 0.22, y: -22, rotation: 17, scale: 0.84, ease: "none" }, 0)
    .to(".sunburst", { rotation: 62, scale: 0.83, ease: "none" }, 0)
    .to(".orbit-one", { rotation: -42, scale: 0.9, ease: "none" }, 0)
    .to(".orbit-two", { rotation: 28, scale: 1.06, ease: "none" }, 0)
    .to(".spark-one", { x: -55, y: -35, rotation: 90, ease: "none" }, 0)
    .to(".spark-two", { x: 38, y: 28, rotation: -100, ease: "none" }, 0)
    .to(".floating-caption", { x: 34, y: -15, autoAlpha: 0, ease: "none" }, 0)
    .to(storyCopy, { autoAlpha: 1, y: 0, ease: "none" }, 0.24)
    .to(".hero-copy", { x: -45, autoAlpha: 0.18, scale: 0.9, transformOrigin: "left top", ease: "none" }, 0.35)
    .to(".flavour-note", { autoAlpha: 0, ease: "none" }, 0.2);
})();
