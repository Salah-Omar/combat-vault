'use client';
import { useEffect, useRef } from 'react'

// Lightweight canvas flow-field background (combat energy vibe)
export default function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize(){
      c.width = Math.floor(innerWidth * dpr)
      c.height = Math.floor(innerHeight * dpr)
    }
    resize()
    addEventListener('resize', resize)

    let t = 0
    function loop(){
      t += 0.003
      const w = c.width, h = c.height
      ctx.clearRect(0,0,w,h)
      // radial glow
      const grad = ctx.createRadialGradient(w*.5, h*.35, 0, w*.5, h*.35, Math.max(w,h)*.7)
      grad.addColorStop(0, 'rgba(209,169,84,0.12)')  // brand gold
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0,0,w,h)

      // flowing streaks (sine fields)
      ctx.globalCompositeOperation = 'lighter'
      for(let i=0;i<50;i++){
        const a = i*0.13 + t*2.0
        const x = (Math.sin(a*0.9)+1)/2 * w
        const y = (Math.cos(a*1.1)+1)/2 * h
        const len = 120*dpr + Math.sin(a*2+t)*60*dpr
        const ang = a*1.7
        const x2 = x + Math.cos(ang)*len
        const y2 = y + Math.sin(ang)*len
        const g = ctx.createLinearGradient(x,y,x2,y2)
        g.addColorStop(0,'rgba(226,29,43,0.08)') // punch red
        g.addColorStop(1,'rgba(209,169,84,0.14)') // gold
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4*dpr
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" />
}
