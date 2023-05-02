import React from "react"
import { CornerUpLeft, CornerUpRight } from "lucide-react"

interface Props {}

function UndoRedo(props: Props) {
  const {} = props

  return (
    <>
      <main className=" shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-full px-4 py-2 flex absolute top-2 bg-white right-0 left-0 w-fit m-auto transition-transform duration-300 hover:transform hover:scale-105">
        <div className="pr-1 cursor-pointer">
          <CornerUpLeft className="h-4 w-4" />
        </div>
        <div className="pl-1 cursor-pointer">
          <CornerUpRight className="h-4 w-4" />
        </div>
      </main>
    </>
  )
}

export { UndoRedo }
