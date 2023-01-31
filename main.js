const canvas = document.querySelector(".main-canvas");
const helloHeader = document.querySelector(".hello-header");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 180;

const currentFrame = (index) =>
  `./intro-animation-optimized/(${(index + 1).toString()}).webp`;
const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

const render = () => {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
};

images[0].onload = render;

gsap.to(ball, {
  scrollTrigger: {
    scrub: 1,
    pin: "canvas",
    end: "500%",
    markers: true,
  },
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  onUpdate: render,
});

gsap.fromTo(
  ".hello-header",
  { opacity: 0},
  {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: "10%",
      end: "40%",
      markers: true,
    },
    onComplete: () => {
      gsap.to(".hello-header", { opacity: 0, display: 'none'});
    },
  }
);

let sbvtSections = gsap.utils.toArray(".panel-sbvt");

gsap.to(sbvtSections, {
  xPercent: -100 * (sbvtSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".sbvt",
    pin: true,
    start: "5%",
    scrub: 0.6,
    snap: 1 / (sbvtSections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=" + document.querySelector(".sbvt").offsetWidth,
    markers: true,
  },
});

let rcSections = gsap.utils.toArray(".panel-rc");

gsap.to(rcSections, {
  xPercent: -100 * (rcSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".rc",
    pin: true,
    start: "5%",
    scrub: 0.6,
    snap: 1 / (rcSections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=" + document.querySelector(".rc").offsetWidth,
    markers: true,
  },
});
