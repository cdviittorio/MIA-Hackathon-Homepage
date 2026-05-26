"use client"

import { useEffect, useRef } from "react"

export function GlowingOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      originX: number
      originY: number
      vx: number
      vy: number
      size: number
      opacity: number
      speed: number
      angle: number
      distance: number
      color: string

      constructor(centerX: number, centerY: number, radius: number, isDispersing: boolean, color: string) {
        this.color = color
        if (isDispersing) {
          const angle = Math.random() * Math.PI * 2
          const dist = radius + Math.random() * radius * 2
          this.x = centerX + Math.cos(angle) * dist
          this.y = centerY + Math.sin(angle) * dist
          this.vx = (Math.random() - 0.3) * 2
          this.vy = (Math.random() - 0.5) * 1
          this.opacity = Math.random() * 0.8 + 0.2
        } else {
          const angle = Math.random() * Math.PI * 2
          const dist = Math.random() * radius * 0.9
          this.x = centerX + Math.cos(angle) * dist
          this.y = centerY + Math.sin(angle) * dist
          this.vx = 0
          this.vy = 0
          this.opacity = Math.random() * 0.6 + 0.4
        }
        this.originX = this.x
        this.originY = this.y
        this.size = Math.random() * 2.5 + 0.5
        this.speed = Math.random() * 0.5 + 0.2
        this.angle = Math.random() * Math.PI * 2
        this.distance = Math.random() * 20 + 5
      }

      update(isDispersing: boolean) {
        if (isDispersing) {
          this.x += this.vx
          this.opacity *= 0.998
          if (this.opacity < 0.01) {
            this.opacity = Math.random() * 0.8 + 0.2
            this.x = this.originX
          }
        } else {
          this.angle += this.speed * 0.02
          this.x = this.originX + Math.sin(this.angle) * this.distance * 0.3
          this.y = this.originY + Math.cos(this.angle) * this.distance * 0.3
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace("1)", `${this.opacity})`)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      
      // Earth (MIA) - far left side, teal/green
      const earthX = canvas.width * 0.08
      const earthY = canvas.height * 0.5
      const earthRadius = Math.min(canvas.width, canvas.height) * 0.1

      for (let i = 0; i < 200; i++) {
        particles.push(new Particle(earthX, earthY, earthRadius, false, "rgba(0, 230, 180, 1)"))
      }
      for (let i = 0; i < 300; i++) {
        particles.push(new Particle(earthX, earthY, earthRadius, true, "rgba(0, 230, 180, 1)"))
      }

      // Mars - far right side, red/orange
      const marsX = canvas.width * 0.92
      const marsY = canvas.height * 0.5
      const marsRadius = Math.min(canvas.width, canvas.height) * 0.12

      for (let i = 0; i < 250; i++) {
        particles.push(new Particle(marsX, marsY, marsRadius, false, "rgba(255, 100, 50, 1)"))
      }
      for (let i = 0; i < 150; i++) {
        const p = new Particle(marsX, marsY, marsRadius, true, "rgba(255, 140, 80, 1)")
        p.vx = -Math.abs(p.vx) // Disperse towards center/left
        particles.push(p)
      }
    }

    const drawPlanet = (
      centerX: number, 
      centerY: number, 
      radius: number, 
      colors: { inner: string, mid: string, outer: string, glow: string }
    ) => {
      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius * 1.8
      )
      outerGlow.addColorStop(0, colors.glow)
      outerGlow.addColorStop(0.5, colors.glow.replace("0.3", "0.1"))
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()

      // Main planet gradient
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 0,
        centerX, centerY, radius
      )
      gradient.addColorStop(0, colors.inner)
      gradient.addColorStop(0.4, colors.mid)
      gradient.addColorStop(1, colors.outer)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Inner shine
      const shine = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX - radius * 0.2, centerY - radius * 0.2, radius * 0.5
      )
      shine.addColorStop(0, "rgba(255, 255, 255, 0.35)")
      shine.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = shine
      ctx.fill()
    }

    const drawTravelPath = () => {
      const startX = canvas.width * 0.15
      const endX = canvas.width * 0.85
      const centerY = canvas.height * 0.5
      const amplitude = canvas.height * 0.15

      // Animated dashed path
      ctx.beginPath()
      ctx.setLineDash([10, 20])
      ctx.lineDashOffset = -time * 0.5
      
      ctx.moveTo(startX, centerY)
      for (let x = startX; x <= endX; x += 5) {
        const progress = (x - startX) / (endX - startX)
        const y = centerY - Math.sin(progress * Math.PI) * amplitude
        ctx.lineTo(x, y)
      }
      
      const gradient = ctx.createLinearGradient(startX, centerY, endX, centerY)
      gradient.addColorStop(0, "rgba(0, 230, 180, 0.6)")
      gradient.addColorStop(0.5, "rgba(200, 200, 100, 0.4)")
      gradient.addColorStop(1, "rgba(255, 100, 50, 0.6)")
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.setLineDash([])

      // Traveling particle
      const travelProgress = (Math.sin(time * 0.015) + 1) / 2
      const travelX = startX + (endX - startX) * travelProgress
      const travelY = centerY - Math.sin(travelProgress * Math.PI) * amplitude
      
      ctx.beginPath()
      ctx.arc(travelX, travelY, 6, 0, Math.PI * 2)
      const particleGradient = ctx.createRadialGradient(travelX, travelY, 0, travelX, travelY, 12)
      particleGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      particleGradient.addColorStop(0.5, "rgba(255, 200, 100, 0.8)")
      particleGradient.addColorStop(1, "rgba(255, 200, 100, 0)")
      ctx.fillStyle = particleGradient
      ctx.fill()
    }

    const drawLabels = () => {
      ctx.font = "bold 14px system-ui, sans-serif"
      ctx.textAlign = "center"
      
      // MIA label
      ctx.fillStyle = "rgba(0, 230, 180, 0.9)"
      ctx.fillText("MIA", canvas.width * 0.08, canvas.height * 0.5 + Math.min(canvas.width, canvas.height) * 0.1 + 25)
      
      // MARS label
      ctx.fillStyle = "rgba(255, 100, 50, 0.9)"
      ctx.fillText("MARS", canvas.width * 0.92, canvas.height * 0.5 + Math.min(canvas.width, canvas.height) * 0.12 + 30)
    }

    const drawStars = () => {
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(i * 1234.5) + 1) * canvas.width / 2
        const y = (Math.cos(i * 5678.9) + 1) * canvas.height / 2
        const twinkle = Math.sin(time * 0.02 + i) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(x, y, twinkle * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.4})`
        ctx.fill()
      }
    }

    const animate = () => {
      time++
      
      // Dark space background
      ctx.fillStyle = "rgba(18, 22, 26, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawStars()

      // Draw Earth (MIA)
      drawPlanet(
        canvas.width * 0.08,
        canvas.height * 0.5,
        Math.min(canvas.width, canvas.height) * 0.1,
        {
          inner: "rgba(150, 255, 220, 0.9)",
          mid: "rgba(0, 200, 160, 0.7)",
          outer: "rgba(0, 80, 60, 0.3)",
          glow: "rgba(0, 230, 180, 0.3)"
        }
      )

      // Draw Mars
      drawPlanet(
        canvas.width * 0.92,
        canvas.height * 0.5,
        Math.min(canvas.width, canvas.height) * 0.12,
        {
          inner: "rgba(255, 180, 140, 0.95)",
          mid: "rgba(220, 80, 40, 0.8)",
          outer: "rgba(140, 40, 20, 0.4)",
          glow: "rgba(255, 100, 50, 0.3)"
        }
      )

      drawTravelPath()
      drawLabels()

      particles.forEach((p, i) => {
        const isEarthParticle = i < 600
        const orbParticleCount = isEarthParticle ? 250 : 300
        const isDispersing = isEarthParticle ? i >= 250 : i >= 900
        p.update(isDispersing)
        p.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
