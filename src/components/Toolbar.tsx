"use client"
import { useToolContext } from "@/contexts/ToolContext"
import React, { Fragment, useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Edit2, Eraser, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { colorPalette } from "@/lib/colors"

interface Props {}

function Toolbar(props: Props) {
  const {} = props

  const { stateTool, dispatchTool } = useToolContext()
  const [statePen, setStatePen] = useState<boolean>()
  const [stateErase, setStateErase] = useState<boolean>()
  const [stateClearAll, setStateClearAll] = useState<boolean>()
  const penSizeThickness = [
    { id: 0, thickness: "2" },
    { id: 1, thickness: "4" },
    { id: 2, thickness: "6" },
    { id: 3, thickness: "8" },
    { id: 4, thickness: "10" },
  ]

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

  const handleColorsClick = (i: any) => {
    dispatchTool({ type: "SET_PEN_COLOR", payload: i?.color })
  }

  const handlePenSizeClick = (i : any) => {
    console.log({i})
    dispatchTool({ type: "SET_PEN_SIZE", payload: i?.thickness })
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
          <Toggle
            pressed={statePen}
            onPressedChange={(i: any) => handlePenPressedChange(i)}
            onClick={handlePen}
          >
            <Edit2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={stateErase}
            onPressedChange={(i: any) => handleErasePressedChange(i)}
            onClick={handleErase}
          >
            <Eraser className="h-4 w-4" />
          </Toggle>
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
                  style={{ width: "20px", height: stateTool?.penSize + "px", backgroundColor: "#000000" }}
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
                      <div onClick={() => handlePenSizeClick(i)} className="hover:bg-gray-100 w-[100%] flex items-center justify-center rounded-sm cursor-pointer">
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
        </div>
      </div>
    </>
  )
}

export { Toolbar }
