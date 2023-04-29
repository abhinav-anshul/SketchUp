"use client"
import { useToolContext } from "@/contexts/ToolContext"
import React, { Fragment, createElement, useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Edit2, Eraser, X, Download, Grid, Square } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { colorPalette } from "@/lib/colors"
import domtoimage from "retina-dom-to-image"
import { penSizeThickness, penStyleType, paperType } from "@/constants/index.tsx"

interface Props {}

function Toolbar(props: Props) {
  const {} = props

  const { stateTool, dispatchTool } = useToolContext()
  const [statePen, setStatePen] = useState<boolean>()
  const [stateErase, setStateErase] = useState<boolean>()
  const [stateClearAll, setStateClearAll] = useState<boolean>()
  const [stateDownload, setStateDownload] = useState<boolean>()

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
    console.log("--toolbar")
    dispatchTool({ type: "SET_CLEAR_ALL", payload: true })
  }

  const handlePenPressedChange = (i: any) => {
    console.log({ i })
    setStateErase(false)
  }

  const handleErasePressedChange = (i: any) => {
    console.log({ i })
    setStatePen(false)
  }

  const handleClearAllPressedChange = (i: any) => {
    console.log({ i })
  }

  const handleDownloadPressedChange = (i: any) => {
    console.log({ i })
  }

  const handleColorsClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_COLOR", payload: i?.color })
  }

  const handlePenSizeClick = (i: any) => {
    console.log({ i })
    dispatchTool({ type: "SET_PEN_SIZE", payload: i?.thickness })
  }

  const handlePenStyleClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_STYLE", payload: i?.styleType })
  }

  const handlePaperTypeClick = (i: any) => {
    console.log({i})
    dispatchTool({ type: "SET_PAPER_TYPE", payload: i?.paperType })
  }

  const handleDownload = (i: any) => {
    // domtoimage
    // .toPng(nodeRef)
    // .then(function (dataUrl: any) {
    //   const link = document.createElement("a")
    //   link.download = "my-image.png"
    //   link.href = dataUrl
    //   link.click()
    // })
    // .catch(function (error: any) {
    //   console.error("oops, something went wrong!", error)
    // })
  }

  console.log({ stateTool })
  return (
    <>
      <div className="flex absolute bottom-[20px] justify-center items-center w-[100%]">
        <div
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          className="px-4 rounded-md h-[60px] flex justify-around items-center min-w-[800px]"
        >
          {/* @ts-ignore */}
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
          <Popover>
            <PopoverTrigger>
              <div
                style={{ backgroundColor: "hsl(210 40% 96.1%)" }}
                className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
              >
                <div
                  className=""
                  style={{
                    borderTopWidth: "4px",
                    borderStyle: stateTool?.penStyle,
                    borderRadius: "50%",
                    width: "30px",
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
                        className="hover:bg-gray-100 w-[100%] flex items-center justify-center rounded-sm cursor-pointer"
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
          <Toggle
            pressed={stateClearAll}
            onPressedChange={(i: any) => handleClearAllPressedChange(i)}
            onClick={handleClearAll}
          >
            <X className="h-4 w-4" />
          </Toggle>
          {/* // pen color */}
          <Popover>
            <PopoverTrigger>
              <div
                style={{ backgroundColor: "hsl(210 40% 96.1%)" }}
                className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
              >
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
                    <div
                      onClick={() => handleColorsClick(i)}
                      style={{ backgroundColor: i.color, cursor: "pointer" }}
                      className={`w-[20px] h-[20px] rounded-full`}
                      key={index}
                    ></div>
                  ))}
                </div>
              </main>
            </PopoverContent>
          </Popover>
          {/* // pen size */}
          <Popover>
            <PopoverTrigger>
              <div
                style={{ backgroundColor: "hsl(210 40% 96.1%)" }}
                className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
              >
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
                            backgroundColor: "#000000",
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
          <Popover>
            <PopoverTrigger>
              <div
                style={{ backgroundColor: "hsl(210 40% 96.1%)" }}
                className="flex justify-center items-center hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
              >
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
      </div>
    </>
  )
}

export { Toolbar }
