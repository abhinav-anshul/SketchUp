import { Grid, Square } from "lucide-react"

export const penSizeThickness = [
  { id: 0, thickness: "2" },
  { id: 1, thickness: "4" },
  { id: 2, thickness: "6" },
  { id: 3, thickness: "8" },
  { id: 4, thickness: "10" },
]
export const penStyleType = [
  { id: 0, styleType: "solid" },
  { id: 1, styleType: "dashed" },
  { id: 2, styleType: "dotted" },
]

export const paperType = [
  { id: 0, paperType: "blank", icon: <Square className="h-4 w-4" /> },
  { id: 1, paperType: "grid", icon: <Grid className="h-4 w-4" /> },
]
