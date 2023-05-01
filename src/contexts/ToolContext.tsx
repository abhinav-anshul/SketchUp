"use client"
import React, { createContext, useContext, useMemo, useReducer } from "react"

interface ToolContextState {
  penColor: string
  penSize: string
  isPen: boolean
  isErase: boolean
  clearAll: boolean
  canvasRef: any
  penStyle: string
  paperType: string
  supabaseImgUrl: string
}

type ToolContextAction =
  | { type: "SET_PEN_COLOR"; payload: string }
  | { type: "SET_PEN_SIZE"; payload: string }
  | { type: "SET_IS_PEN"; payload: boolean }
  | { type: "SET_IS_ERASE"; payload: boolean }
  | { type: "SET_CLEAR_ALL"; payload: boolean }
  | { type: "SET_CANVAS_REF"; payload: any }
  | { type: "SET_PEN_STYLE"; payload: string }
  | { type: "SET_PAPER_TYPE"; payload: string }
  | { type: "SET_SUPABASE_URL"; payload: string }

const initialToolContextState: ToolContextState = {
  penColor: "#111",
  penSize: "4",
  isPen: true,
  isErase: false,
  clearAll: false,
  canvasRef: null,
  penStyle: "solid",
  paperType: "blank",
  supabaseImgUrl: ""
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
    case "SET_CLEAR_ALL":
      return { ...state, clearAll: action.payload }
    case "SET_CANVAS_REF":
      return { ...state, canvasRef: action.payload }
    case "SET_PEN_STYLE":
      return { ...state, penStyle: action.payload }
    case "SET_PAPER_TYPE":
      return { ...state, paperType: action.payload }
      case "SET_SUPABASE_URL":
      return { ...state, supabaseImgUrl: action.payload }
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
