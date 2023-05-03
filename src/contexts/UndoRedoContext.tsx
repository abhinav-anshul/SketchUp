// "use client"
// import { useContext, createContext, useMemo, useReducer, ReactNode } from "react"
// interface Props {
//   children: ReactNode
// }
// interface objectStates {
//     penColor: "#111",
//     penSize: "4",
//     penStyle: "solid",
//     paperType: "blank",

// }

// interface initialStateType {
//     canvasSnapshot: Array<objectStates>
// }
// const UndoRedoContext = createContext({})

// function undoRedoContextReducer(state: any, action: any) {}

// const initialUndoRedoContextState: initialStateType = {
//   canvasSnapshot: [],
// }

// export function UndoRedoContextProvider({ children }: Props) {
//   const [stateUndoRedo, dispatchUndoRedo] = useReducer(
//     undoRedoContextReducer,
//     initialUndoRedoContextState
//   )
//   const memoizedState = useMemo(() => stateUndoRedo, [stateUndoRedo])
//   return (
//     <>
//       <UndoRedoContext.Provider value={{ stateUndoRedo: memoizedState, dispatchUndoRedo }}>
//         {children}
//       </UndoRedoContext.Provider>
//     </>
//   )
// }

// export const useUndoRedoContext = () => useContext(UndoRedoContext)
