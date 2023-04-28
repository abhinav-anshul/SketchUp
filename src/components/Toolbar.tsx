"use client"
import { useToolContext } from "@/contexts/ToolContext"
import React, { useContext } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Edit2, Eraser } from "lucide-react"

interface Props {}

function Toolbar(props: Props) {
  const {} = props

  const { stateTool, dispatchTool } = useToolContext()

  const handleErase = () => {
    dispatchTool({ type: "SET_IS_ERASE", payload: true })
    dispatchTool({ type: "SET_IS_PEN", payload: false })
  }

  const handlePen = () => {
    dispatchTool({ type: "SET_IS_PEN", payload: true })
    dispatchTool({ type: "SET_IS_ERASE", payload: false })
  }

  console.log({ stateTool })

  return (
    <>
      <div className=" flex absolute bottom-[20px] justify-center items-center w-[100%]">
        <div className="px-4 rounded-md shadow-2xl h-[60px] flex items-center min-w-[800px]">
          <Toggle onClick={handlePen} variant="outline" aria-label="Toggle italic">
            <Edit2 className="h-4 w-4" />
          </Toggle>
          <br />
          <Toggle onClick={handleErase} variant="outline" aria-label="Toggle italic">
            <Eraser className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </>
  )
}

export { Toolbar }
