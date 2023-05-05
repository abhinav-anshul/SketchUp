"use client"
import React from "react"

function Loader() {
  return (
    <>
      <main
        style={{
          margin: "0 auto",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div className="loader"></div>
      </main>
    </>
  )
}

export { Loader }
