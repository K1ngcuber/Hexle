import styles from './App.module.css'

const particles = ['✨', '🎉', '🎊', '🎈']
const particleCount = 100

export const startParticles = () => {
  for (let i = 0; i < particleCount; i++) {
    createParticle()
  }
}

const createParticle = () => {
  const particle = document.createElement('particle')
  const size = Math.floor(Math.random() * 20) + 30
  const spawnPoint = document.getElementsByClassName(styles.winHeader)[0]
  //get x and y of spawnpoint
  const { x, y } = spawnPoint.getBoundingClientRect()

  particle.className = styles.particle
  particle.textContent = particles[Math.floor(Math.random() * particles.length)]
  particle.style.fontSize = `${size}px`

  spawnPoint.append(particle)

  animate(x, y, particle, size)
}

const animate = (x: number, y: number, particle: HTMLElement, size: number) => {
  const destinationX = x + (Math.random() - 0.5) * 2 * 500
  const destinationY = y + (Math.random() - 0.5) * 2 * 200

  // Store the animation in a variable because we will need it later
  const animation = particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 1,
      },
    ],
    {
      // Set a random duration from 500 to 1500ms
      duration: 500 + Math.random() * 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      // Delay every particle with a random value from 0ms to 200ms
      delay: Math.random() * 200,
    },
  )

  animation.onfinish = () => {
    //Fade out
    particle.animate(
      [
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,

          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,

          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: 'ease-in',
      },
    ).onfinish = () => {
      particle.remove()
    }
  }
}
