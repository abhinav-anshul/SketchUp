"use client"

import { Canvas } from "@/components/Canvas"
import { Toolbar } from "@/components/Toolbar"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

export default function Home() {
  return (
    <>
      <main>
        <Canvas />
        <Toolbar />
      </main>
    </>
  )
}
