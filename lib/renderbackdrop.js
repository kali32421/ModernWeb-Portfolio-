import { useEffect, useState } from 'react'

export default function RenderBackdropAnimation() {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const htmlEl = document.documentElement

    const updateTheme = () => {
      const t = htmlEl.getAttribute('data-theme')
      setTheme(t)
    }

    updateTheme()

    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          updateTheme()
        }
      }
    })

    observer.observe(htmlEl, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `body { overflow: hidden; }`
    document.head.appendChild(style)

    const terrain = document.getElementById('terrainCanvas')
    const background = document.getElementById('bgCanvas')
    const terrainContext = terrain.getContext('2d')
    const backgroundContext = background.getContext('2d')

    const width = window.innerWidth
    const height = Math.min(document.body.offsetHeight, 400)
    terrain.width = background.width = width
    terrain.height = background.height = height

    const generateTerrain = () => {
      const points = []
      let displacement = 0
      const power = 2 ** Math.ceil(Math.log2(width))
      points[0] = height - (Math.random() * height) / 2
      points[power] = height - (Math.random() * height) / 2
      for (let i = 1; i < power; i *= 2) {
        const step = power / i / 2
        for (let j = step; j < power; j += power / i) {
          points[j] =
            (points[j - step] + points[j + step]) / 2 +
            Math.floor(Math.random() * (-displacement * 2) + displacement)
        }
        displacement *= 0.6
      }
      terrainContext.beginPath()
      for (let i = 0; i <= width; i++) {
        if (i === 0) terrainContext.moveTo(0, points[0])
        else if (points[i] !== undefined) terrainContext.lineTo(i, points[i])
      }
      terrainContext.lineTo(width, terrain.height)
      terrainContext.lineTo(0, terrain.height)
      terrainContext.lineTo(0, points[0])
    }

    class Star {
      constructor(options = {}) {
        this.reset(options)
      }
      reset(options = {}) {
        this.size = Math.random() * 2
        this.speed = Math.random() * 0.1
        this.x = options.x || width
        this.y = options.y || Math.random() * height
      }
      update() {
        this.x -= this.speed
        if (this.x < 0) this.reset()
        else backgroundContext.fillRect(this.x, this.y, this.size, this.size)
      }
    }

    class ShootingStar {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * width
        this.y = 0
        this.len = Math.random() * 80 + 10
        this.speed = Math.random() * 10 + 6
        this.size = Math.random() * 1 - 0.1
        this.waitTime = Date.now() + Math.random() * 3000 + 500
        this.active = false
      }
      update() {
        if (this.active) {
          this.size -= 0.15
          this.x -= this.speed
          this.y += this.speed
          if (this.x < 0 || this.y >= height) this.reset()
          else {
            backgroundContext.lineWidth = this.size
            backgroundContext.beginPath()
            backgroundContext.moveTo(this.x, this.y)
            backgroundContext.lineTo(this.x + this.len, this.y - this.len)
            backgroundContext.stroke()
          }
        } else if (this.waitTime < Date.now()) {
          this.active = true
        }
      }
    }

    const entities = [
      ...Array.from(
        { length: Math.floor(height / 10) },
        () => new Star({ x: Math.random() * width, y: Math.random() * height })
      ),
      new ShootingStar(),
      new ShootingStar()
    ]

    const animate = () => {
      if (theme === 'light') {
        backgroundContext.fillStyle = '#fff'
        backgroundContext.fillRect(0, 0, width, height)
        backgroundContext.fillStyle = '#000'
        backgroundContext.strokeStyle = '#000'
      } else {
        backgroundContext.fillStyle = '#000'
        backgroundContext.fillRect(0, 0, width, height)
        backgroundContext.fillStyle = '#fff'
        backgroundContext.strokeStyle = '#fff'
      }
      entities.forEach(e => e.update())
      requestAnimationFrame(animate)
    }

    generateTerrain()
    backgroundContext.fillRect(0, 0, width, height)

    Array.from(document.getElementsByClassName('landscapeItem')).forEach(m =>
      m.classList.add('animateIn')
    )

    animate()

    setTimeout(() => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.paddingRight = '0px'
      document.documentElement.style.paddingRight = '0px'
    }, 2500)

    return () => {
      document.head.removeChild(style)
    }
  }, [theme])

  return (
    <>
      <canvas id="bgCanvas"></canvas>
      <canvas id="terrainCanvas"></canvas>
      <div className="landscape">
        <div className="landscapeItem mountains background"></div>
        <div className="landscapeItem mountains midground"></div>
        <div className="landscapeItem mountains foreground"></div>
        <div className="landscapeItem trees background"></div>
        <div className="landscapeItem trees midground"></div>
        <div className="landscapeItem trees foreground"></div>
      </div>
    </>
  )
}
