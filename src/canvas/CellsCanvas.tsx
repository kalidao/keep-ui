import React, { useRef } from 'react'
import { useThemeStore } from '~/hooks'

// canvas for cells multiplying and growing black and white
export const CellsCanvas = () => {
  const mode = useThemeStore((state) => state.mode)
  const color = mode === 'dark' ? '#ffffff' : '#000000'
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = color
    ctx.beginPath()

    // on the first frame draw a circle in the middle of the canvas
    if (frameCount === 1) {
      ctx.arc(200, 100, 10, 0, 2 * Math.PI)
    } else {
      // if frameCount = 2 then we draw two circles splitting from the first one, now we have 2 circles
      // if frameCount = 3 then we draw four circles splitting each from the the two circles from the previous frame, now we have 4 circles
      // if frameCount = 4 then we draw eight circles splitting each from the the four circles from the previous frame, now we have 8 circles
      // and so on...
      for (let i = 0; i < frameCount; i++) {
        // we split the circle at `ctx.arc(200, 100, 10, 0, 2 * Math.PI)` into
      }
    }

    ctx.fill()
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    let frameCount = 0
    let animationFrameId: number

    //Our draw came here
    const render = () => {
      if (!context) return

      if (frameCount < 8) {
        frameCount++
      } else {
        frameCount = 0
      }

      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }

    // only render every 1 second
    setInterval(render, 1000)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas width="400px" height="200px" ref={canvasRef} />
}
