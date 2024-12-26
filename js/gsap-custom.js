// lenis-smoothscroller
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time *1000); 
});

gsap.ticker.lagSmoothing(0);

// close


// features-page


// gsap.to(".features-main .features-single", {
//   transform:"translateY(-150%)",
//   scrollTrigger:{
//     trigger:".features-main",
//     scroller:"body",
//     markers:true,
//     start:"top 0%",
//     end:"top -350%",
//     scrub:10,
//     pin:true
//   }
// })


// close



console.clear();
const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

// Set the video starting point to 0.3 seconds and play when the page loads or is refreshed
document.addEventListener("DOMContentLoaded", function() {
  video.currentTime = 0.3;
  video.play();
});

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".scroller-video",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0.8
    },
    {
      currentTime: video.duration || 0.4
    }
  );
});

setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.4; 
      });
  }
}, 900);
