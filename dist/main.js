
const canvas = document.querySelector('.main-canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')
const frameCount = 180

const currentFrame = (index) => `./intro-animation-optimized/(${(index + 1).toString()}).webp`
const images = []
let ball = {frame: 0}

for (let i=0; i<frameCount; i++){
  const img = new Image()
  img.src = currentFrame(i)
  images.push(img)
}

const render = () => {

  context.canvas.width = images[0].width
  context.canvas.height = images[0].height

  context.clearRect(0,0,canvas.width, canvas.height)
  context.drawImage(images[ball.frame], 0, 0)
}

images[0].onload = render

gsap.to(ball, {
  frame: frameCount - 1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    scrub: true,
    pin: 'canvas',
    end: '500%',
    markers: true,
  },
  onUpdate: render,
})

gsap.fromTo('.hello-header', {opacity: 0}, {opacity: 1,
scrollTrigger: {
  scrub: true,
  start: '0%',
  end: '40%',
},
onComplete: () => {
  gsap.to('.hello-header', {opacity: 0})
},
})