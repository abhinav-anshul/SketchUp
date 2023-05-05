import { ToolContextProvider } from "@/contexts/ToolContext"
import { Inter } from "next/font/google"
import "../styles/globals.css"
// import { UndoRedoContextProvider } from "@/contexts/UndoRedoContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SketchUp",
  description: "A free flow drawing board",
  icons: {
    icon: '/sketchup-favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <UndoRedoContextProvider> */}
          <ToolContextProvider>{children}</ToolContextProvider>
        {/* </UndoRedoContextProvider> */}
      </body>
    </html>
  )
}
