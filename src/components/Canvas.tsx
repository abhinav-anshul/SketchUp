"use client"

import { useToolContext } from "@/contexts/ToolContext"
import { drawDots } from "@/lib/paperType"
import React, { useRef, useEffect, useLayoutEffect, useState } from "react"

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [isErasing, setIsErasing] = useState<boolean>(false)

  // for localstorage saving
  const [canvasState, setCanvasState] = useState<any>({
    strokes: [],
    currentStroke: [],
    strokeColor: "#000000",
    strokeWidth: 5,
  })

  const { stateTool, dispatchTool } = useToolContext()
  const canvas = canvasRef.current
  const ctx = canvas?.getContext("2d")
  
  // for higher canvas resolution
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.canvas.width = window.innerWidth * 6
      ctx.canvas.height = window.innerHeight * 6
      ctx.scale(6, 6)
    }
  }, [])

  // useEffect(() => {
  //   const savedState = localStorage.getItem("canvasState")
  //   if (savedState) {
  //     setCanvasState(JSON.parse(savedState))
  //   }
  //   const canvas = canvasRef.current
  //   const ctx = canvas?.getContext("2d")
  //   canvasState.strokes.forEach((stroke: any) => {
  //     ctx?.beginPath()
  //     ctx?.moveTo(stroke[0]?.x, stroke[0]?.y)
  //     stroke.forEach((i: any) => {
  //       ctx?.lineTo(i?.x, i?.y)
  //       ctx?.stroke()
  //     })
  //   })
  // }, [ctx, canvas, canvasState.strokes])

  // for paper type - grid or blank
  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext("2d")
    if (stateTool?.paperType === "grid") {
      drawDots(ctx)
    }
    if (stateTool?.paperType === "blank") {
      if (canvas) {
        ctx?.clearRect(0, 0, canvas?.width, canvas?.height)
      }
    }
  }, [ctx, stateTool?.paperType, canvas?.height, canvas?.width, canvas])

  // download the canvas as an image
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      dispatchTool({ type: "SET_CANVAS_REF", payload: canvas })
    }
  }, [stateTool?.canvasRef, dispatchTool, canvasRef, canvas])

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
        if (stateTool?.paperType === "grid") {
          drawDots(ctx)
        }
      }
      const erase = (e: any) => {
        if (isErasing) {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext("2d")
          ctx?.lineTo(e?.offsetX, e.offsetY)
          ctx?.stroke()
          if (stateTool?.paperType === "grid") {
            drawDots(ctx)
          }
        }
      }
      const stopErasing = () => {
        setIsErasing(false)
        if (stateTool?.paperType === "grid") {
          drawDots(ctx)
        }
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
  }, [isErasing, stateTool?.isErase, stateTool?.isPen, stateTool?.paperType])

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
        if (stateTool?.penStyle === "dashed") {
          ctx.setLineDash([5, 10])
        } else if (stateTool?.penStyle === "dotted") {
          ctx.setLineDash([1, 8])
        } else {
          ctx.setLineDash([0, 0])
        }
      }
      const startDrawing = (e: any) => {
        setIsDrawing(true)
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        ctx?.beginPath()
        ctx?.moveTo(e.offsetX, e.offsetY)
        // ctx?.arc(e.offsetX, e.offsetX, 10, 0, Math.PI*2);
        dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
        // if (canvas) {
        //   const updatedState = {
        //     ...canvasState,
        //     currentStroke: [{ x: e.offsetX, y: e.offsetY }],
        //   }
        //   setCanvasState(updatedState)
        // }
      }
      const draw = (e: any) => {
        if (isDrawing) {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext("2d")
          ctx?.lineTo(e?.offsetX, e.offsetY)
          ctx?.stroke()
          dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
          // const updatedState = {
          //   ...canvasState,
          //   currentStroke: [...canvasState.currentStroke, { x: e.offsetX, y: e.offsetY }],
          // }
          // setCanvasState(updatedState)
        }
      }
      const stopDrawing = () => {
        setIsDrawing(false)
        dispatchTool({ type: "SET_CLEAR_ALL", payload: false })
        const updatedState = {
          ...canvasState,
          strokes: [...canvasState.strokes, canvasState.currentStroke],
          currentStroke: [],
        }
        // setCanvasState(updatedState)
        // const data = JSON.stringify(canvasState)
        // localStorage.setItem("canvasState", data)
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
  }, [
    isDrawing,
    stateTool?.isPen,
    stateTool?.isErase,
    stateTool?.penColor,
    dispatchTool,
    stateTool?.penSize,
    stateTool?.penStyle,
    canvasState,
  ])

  // clearAll
  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas && stateTool?.clearAll === true) {
      ctx.clearRect(0, 0, canvas?.width, canvas?.height)
    }
    // prevents clearing of dots as a bg if selected on paperType
    if (stateTool?.paperType === "grid") {
      drawDots(ctx)
    }
  }, [stateTool?.clearAll, stateTool?.paperType])

  return (
    <>
      <canvas ref={canvasRef}>Browser is not supported!</canvas>
    </>
  )
}

export { Canvas }
