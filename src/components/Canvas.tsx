"use client"

import { useToolContext } from "@/contexts/ToolContext"
import React, { useRef, useEffect, useLayoutEffect, useState } from "react"

interface Props {}

function Canvas(props: Props) {
  const {} = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [isErasing, setIsErasing] = useState<boolean>(false)
  const { stateTool, dispatchTool } = useToolContext()

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (ctx) {
      ctx.canvas.width = window.innerWidth
      ctx.canvas.height = window.innerHeight
    }
  }, [])

  // isErase useEffect()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (stateTool?.isErase) {
      if (ctx) {
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 50
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
      }
      const startErasing = (e: any) => {
        setIsDrawing(false)
        setIsErasing(true)
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        ctx?.beginPath()
        ctx?.moveTo(e.offsetX, e.offsetY)
      }
      const erase = (e: any) => {
        if (isErasing) {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext("2d")
          ctx?.lineTo(e?.offsetX, e.offsetY)
          ctx?.stroke()
        }
      }
      const stopErasing = () => {
        setIsErasing(false)
      }
      // add event handlers here
      canvas?.addEventListener("mousemove", erase)
      canvas?.addEventListener("mouseup", stopErasing)
      canvas?.addEventListener("mousedown", startErasing)
      canvas?.addEventListener("mouseout", stopErasing)

      // remove event handlers here
      return () => {
        canvas?.removeEventListener("mousemove", erase)
        canvas?.removeEventListener("mouseup", stopErasing)
        canvas?.removeEventListener("mousedown", startErasing)
        canvas?.removeEventListener("mouseout", stopErasing)
      }
    }
  }, [isErasing, stateTool?.isErase, stateTool?.isPen])

  // ispen useEffect()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (stateTool?.isPen) {
      if (ctx) {
        ctx.strokeStyle = stateTool?.penColor
        ctx.lineWidth = Number(stateTool?.penSize)
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
      }
      const startDrawing = (e: any) => {
        setIsDrawing(true)
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        ctx?.beginPath()
        ctx?.moveTo(e.offsetX, e.offsetY)
        dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
      }
      const draw = (e: any) => {
        if (isDrawing) {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext("2d")
          ctx?.lineTo(e?.offsetX, e.offsetY)
          ctx?.stroke()
          dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
        }
      }
      const stopDrawing = () => {
        setIsDrawing(false)
        dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
      }
      // add event handlers here
      canvas?.addEventListener("mousemove", draw)
      canvas?.addEventListener("mouseup", stopDrawing)
      canvas?.addEventListener("mousedown", startDrawing)
      canvas?.addEventListener("mouseout", stopDrawing)

      // remove event handlers here
      return () => {
        canvas?.removeEventListener("mousemove", draw)
        canvas?.removeEventListener("mouseup", stopDrawing)
        canvas?.removeEventListener("mousedown", startDrawing)
        canvas?.removeEventListener("mouseout", stopDrawing)
      }
    }
  }, [isDrawing, stateTool?.isPen, stateTool?.isErase, stateTool?.penColor, dispatchTool])

  // clearAll
  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas && stateTool?.clearAll === true) {
      ctx.clearRect(0, 0, canvas?.width, canvas?.height)
    }
  }, [stateTool?.clearAll])

  return (
    <main>
      <canvas ref={canvasRef}>Browser is not supported!</canvas>
    </main>
  )
}

export { Canvas }
