"use client"
import { useToolContext } from "@/contexts/ToolContext"
import React, { Fragment, useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Edit2, Eraser, X, Download, Square } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { colorPalette } from "@/lib/colors"
import { penSizeThickness, penStyleType, paperType } from "@/constants/index.tsx"
import { createClient } from "@supabase/supabase-js"
import { nanoid } from "nanoid"

function Toolbar() {
  const { stateTool, dispatchTool } = useToolContext()
  const [statePen, setStatePen] = useState<boolean>()
  const [stateErase, setStateErase] = useState<boolean>()
  const [stateClearAll, setStateClearAll] = useState<boolean>()
  const [stateDownload, setStateDownload] = useState<boolean>()
  const [isLineTypePopoverOpen, setIsLineTypePopoverOpen] = useState<boolean>(false)
  const [isPenColorPopoverOpen, setIsPenColorPopoverOpen] = useState<boolean>(false)
  const [isPenSizePopoverOpen, setIsPenSizePopoverOpen] = useState<boolean>(false)
  const [isPaperTypePopoverOpen, setIsPaperTypePopoverOpen] = useState<boolean>(false)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as any
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY as any
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const nanoId = nanoid()
  const handleErase = () => {
    dispatchTool({ type: "SET_IS_ERASE", payload: true })
    dispatchTool({ type: "SET_IS_PEN", payload: false })
  }

  const handlePen = () => {
    dispatchTool({ type: "SET_IS_PEN", payload: true })
    dispatchTool({ type: "SET_IS_ERASE", payload: false })
  }

  const handleClearAll = () => {
    //clear canvas
    dispatchTool({ type: "SET_CLEAR_ALL", payload: true })
  }

  const handlePenPressedChange = (i: any) => {
    setStateErase(false)
  }

  const handleErasePressedChange = (i: any) => {
    setStatePen(false)
  }

  const handleClearAllPressedChange = (i: any) => {}

  const handleDownloadPressedChange = (i: any) => {}

  const handleColorsClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_COLOR", payload: i?.color })
    setIsPenColorPopoverOpen(false)
  }

  const handlePenSizeClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_SIZE", payload: i?.thickness })
    setIsPenSizePopoverOpen(false)
  }

  const handlePenStyleClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_STYLE", payload: i?.styleType })
    setIsLineTypePopoverOpen(false)
  }

  const handlePaperTypeClick = (i: any) => {
    dispatchTool({ type: "SET_PAPER_TYPE", payload: i?.paperType })
    setIsPaperTypePopoverOpen(false)
  }

  const handleDownload = () => {
    if (stateTool?.canvasRef) {
      const url = stateTool?.canvasRef?.toDataURL()
      const img = new Image()
      img.onload = () => {
        const newCanvas = document?.createElement("canvas")
        const newCtx = newCanvas?.getContext("2d")
        // set the new canvas dimensions to match the downloaded image
        newCanvas.width = img.width
        newCanvas.height = img.height
        // draw a white background
        if (newCtx) {
          newCtx.fillStyle = "#fff"
          newCtx?.fillRect(0, 0, newCanvas.width, newCanvas.height)
        }
        // draw the downloaded image onto the new canvas
        newCtx?.drawImage(img, 0, 0)
        // create a temporary link to download the image
        const link = document.createElement("a")
        link.download = "sketch.png"
        link.href = newCanvas.toDataURL()
        // simulate a click on the link to download the image
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      img.src = url
    }
  }
  return (
    <>
      <div
        style={{
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "min-content",
          margin: "0 auto",
          position: "absolute",
          bottom: "10px",
          left: "0",
          right: "0",
        }}
        className="px-4 rounded-md h-[60px] flex justify-around items-center min-w-[500px] bg-white"
      >
        {/* // pen tool */}
        <Toggle
          pressed={statePen}
          onPressedChange={(i: any) => handlePenPressedChange(i)}
          onClick={handlePen}
        >
          <Edit2 className="h-4 w-4" />
        </Toggle>
        {/* // erase */}
        <Toggle
          pressed={stateErase}
          onPressedChange={(i: any) => handleErasePressedChange(i)}
          onClick={handleErase}
        >
          <Eraser className="h-4 w-4" />
        </Toggle>
        {/* // line type - dashed or solid or dotted*/}
        <Popover open={isLineTypePopoverOpen} onOpenChange={(i) => setIsLineTypePopoverOpen(i)}>
          <PopoverTrigger>
            <div
              className={`flex justify-center items-center hover:bg-gray-100 ${
                isLineTypePopoverOpen ? `bg-gray-100` : null
              } w-[40px] h-[40px] rounded-md`}
            >
              <div
                className=""
                style={{
                  borderTopWidth: "4px",
                  borderStyle: stateTool?.penStyle,
                  borderRadius: "50%",
                  width: "25px",
                  height: "15px",
                  transform: "rotate(136deg)",
                  borderColor: stateTool?.penColor,
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <main>
              <div
                className="h-40 w-[50px] mx-2 my-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                {penStyleType?.map((i, index) => (
                  <Fragment key={i.id}>
                    <div
                      onClick={() => handlePenStyleClick(i)}
                      className="hover:bg-gray-100 w-[100%] flex items-center justify-center rounded-md cursor-pointer"
                    >
                      <div
                        style={{
                          borderTopWidth: "4px",
                          borderStyle: i?.styleType,
                          borderRadius: "50%",
                          width: "30px",
                          height: "15px",
                          transform: "rotate(136deg)",
                          borderColor: stateTool?.penColor,
                        }}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </main>
          </PopoverContent>
        </Popover>
        {/* // clear all */}
        <div
          onClick={handleClearAll}
          className="flex cursor-pointer justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
        >
          <div className="rounded-full">
            <X className="h-4 w-4" />
          </div>
        </div>
        {/* // pen color */}
        <Popover open={isPenColorPopoverOpen} onOpenChange={(i) => setIsPenColorPopoverOpen(i)}>
          <PopoverTrigger>
            <div className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md">
              <div
                className="rounded-full"
                style={{ width: "20px", height: "20px", backgroundColor: stateTool?.penColor }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <main>
              <div
                className="px-4 py-4 w-54"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                {colorPalette?.map((i, index) => (
                  <Fragment key={index}>
                    <div
                      onClick={() => handleColorsClick(i)}
                      className="hover:bg-gray-200 p-1 cursor-pointer rounded-sm"
                    >
                      <div
                        style={{ backgroundColor: i.color }}
                        className={`w-[20px] h-[20px] rounded-full`}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </main>
          </PopoverContent>
        </Popover>
        {/* // pen size */}
        <Popover open={isPenSizePopoverOpen} onOpenChange={(i) => setIsPenSizePopoverOpen(i)}>
          <PopoverTrigger>
            <div className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md">
              <div
                className="rounded-md"
                style={{
                  width: "20px",
                  height: stateTool?.penSize + "px",
                  backgroundColor: stateTool?.penColor,
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <main>
              <div
                className="h-40 w-[60px] mx-2 my-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                {penSizeThickness?.map((i, index) => (
                  <Fragment key={i?.id}>
                    <div
                      onClick={() => handlePenSizeClick(i)}
                      className="hover:bg-gray-100 w-[100%] flex items-center justify-center rounded-sm cursor-pointer"
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: "20px",
                          height: `${i?.thickness}px`,
                          backgroundColor: stateTool?.penColor,
                        }}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </main>
          </PopoverContent>
        </Popover>
        {/* // paper type */}
        <Popover open={isPaperTypePopoverOpen} onOpenChange={(i) => setIsPaperTypePopoverOpen(i)}>
          <PopoverTrigger>
            <div className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md">
              <Square className="h-4 w-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <main>
              <div
                className="h-20 w-[60px] mx-2 my-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                {paperType?.map((i, index) => (
                  <Fragment key={i?.id}>
                    <div
                      onClick={() => handlePaperTypeClick(i)}
                      className="hover:bg-gray-100 w-[100%] flex items-center justify-center rounded-sm cursor-pointer"
                    >
                      <div>{i?.icon}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </main>
          </PopoverContent>
        </Popover>
        {/* // download */}
        <Toggle
          pressed={stateDownload}
          onPressedChange={(i: any) => handleDownloadPressedChange(i)}
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </Toggle>
      </div>
    </>
  )
}

export { Toolbar }
