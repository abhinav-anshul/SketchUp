"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useToolContext } from "@/contexts/ToolContext"
import { createClient } from "@supabase/supabase-js"
import { nanoid } from "nanoid"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import QRCode from "qrcode.react"

interface Props {}

function Share(props: Props) {
  const {} = props
  const { stateTool, dispatchTool } = useToolContext()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as any
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY as any
  const supabaseStorageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as any
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const nanoId = nanoid()
  const [shareLink, setShareLink] = useState<string>("")

  const handleLink = () => {
    // setShareLink("gfdsa")
  }

  const handleShare = async () => {
    if (stateTool?.canvasRef) {
      const url = stateTool?.canvasRef?.toDataURL()
      const img = new Image()
      img.onload = async () => {
        const newCanvas = document?.createElement("canvas")
        const newCtx = newCanvas?.getContext("2d")
        if (newCtx) {
          newCanvas.width = img.width
          newCanvas.height = img.height
          newCtx.fillStyle = "#fff"
          newCtx?.fillRect(0, 0, newCanvas.width, newCanvas.height)
          newCtx?.drawImage(img, 0, 0)
          // Convert canvas to Blob
          newCanvas.toBlob(async (blob: any) => {
            const { data, error } = await supabase.storage
              .from(`${supabaseStorageBucket}`)
              .upload(`sketch-${nanoId}.png`, blob)
            if (error) {
              console.log("Error uploading image:", error)
            } else {
              dispatchTool({ type: "SET_SUPABASE_URL", payload: data?.path })
              if (process.env.NODE_ENV === "development") {
                setShareLink(() => `http://localhost:3000/share/${data?.path?.split(".")[0]}`)
              }
              if (process.env.NODE_ENV === "production") {
                setShareLink(() => `https://sketchup.vercel.app/share/${data?.path?.split(".")[0]}`)
              }
            }
          })
        }
      }
      img.src = url
    }
  }

  return (
    <div className="absolute right-[10px] top-[10px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button onClick={() => handleShare()} variant="default">
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <main
            className="w-[200px] 
          p-4"
          >
            {/* {shareLink ? (
              <>
                <Input onChange={() => handleLink()} value={shareLink} />
                <br />
                <Link target="_blank" href={`/share/${shareLink.split("/")[4]}`}>
                  <Button variant="secondary">Go to Link</Button>
                </Link>
                <br />
                <QRCode value={shareLink} style={{ marginRight: 50 }} />
              </>
            ) : (
              <Skeleton className="h-[40px] rounded-md" />
            )} */}
            {shareLink ? (
              <Input onChange={() => handleLink()} value={shareLink} />
            ) : (
              <Skeleton className="h-[40px] rounded-md" />
            )}
            <br />
            {shareLink ? (
              <Link target="_blank" href={`/share/${shareLink.split("/")[4]}`}>
                <Button variant="secondary">Go to Link</Button>
              </Link>
            ) : (
              <Skeleton className="h-[40px] w-[100px] rounded-md" />
            )}
            <br />
            {shareLink ? (
              <div>
                <br />
                <QRCode value={shareLink} />
                <div className="text-xs py-1">Anyone with the Link can view this Project</div>
              </div>
            ) : (
              <Skeleton className="h-[128px] w-[128px] rounded-md" />
            )}
          </main>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Share }
