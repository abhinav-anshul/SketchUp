"use client"
import React, { createContext, useContext, useMemo, useReducer } from "react"

interface ToolContextState {
  penColor: string
  penSize: string
  isPen: boolean
  isErase: boolean
}

type ToolContextAction =
  | { type: "SET_PEN_COLOR"; payload: string }
  | { type: "SET_PEN_SIZE"; payload: string }
  | { type: "SET_IS_PEN"; payload: boolean }
  | { type: "SET_IS_ERASE"; payload: boolean }

const initialToolContextState: ToolContextState = {
  penColor: "",
  penSize: "",
  isPen: true,
  isErase: false,
}

function toolContextReducer(state: ToolContextState, action: ToolContextAction): ToolContextState {
  switch (action.type) {
    case "SET_PEN_COLOR":
      return { ...state, penColor: action.payload }
    case "SET_PEN_SIZE":
      return { ...state, penSize: action.payload }
    case "SET_IS_PEN":
      return { ...state, isPen: action.payload }
    case "SET_IS_ERASE":
      return { ...state, isErase: action.payload }
    default:
      return state
  }
}

interface ToolContextValue {
  stateTool?: ToolContextState
  dispatchTool: React.Dispatch<ToolContextAction>
}

const ToolContext = createContext<ToolContextValue>({
  stateTool: initialToolContextState,
  dispatchTool: () => {},
})

interface Props {
  children: React.ReactNode
}

export const ToolContextProvider: React.FC<Props> = ({ children }) => {
  const [stateTool, dispatchTool] = useReducer(toolContextReducer, initialToolContextState)

  const memoizedState = useMemo(() => stateTool, [stateTool])

  return (
    <ToolContext.Provider value={{ stateTool: memoizedState, dispatchTool }}>
      {children}
    </ToolContext.Provider>
  )
}
export const useToolContext = () => useContext(ToolContext)
