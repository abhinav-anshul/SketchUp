"use client"
import { Canvas } from "@/components/Canvas"
import { Toolbar } from "@/components/Toolbar"
import { Share } from "@/components/Share"
import { UndoRedo } from "@/components/UndoRedo"

export default function Home() {
  return (
    <>
      <main>
        <Share />
        <Canvas />
        <Toolbar />
        <UndoRedo />
      </main>
    </>
  )
}
