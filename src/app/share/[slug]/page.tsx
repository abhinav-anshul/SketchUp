"use client"
import { Loader } from "@/components/ui/loader"
import Image from "next/image"
import { useLayoutEffect, useState } from "react"

interface Props {
  params: any
  searchParams: any
}

function Home(props: Props) {
  const { params, searchParams } = props
  const supabaseStorageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET
  const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
  const [loaded, setLoaded] = useState<boolean>()

  useLayoutEffect(() => {
    setLoaded(false)
  }, [])

  return (
    <>
      {loaded === false && <Loader />}
      <Image
        alt="Canvas Image"
        priority={true}
        quality={100}
        onLoadingComplete={() => setLoaded(true)}
        fill={true}
        style={{ width: "100%", height: "100%" }}
        src={`${supabaseProjectUrl}/storage/v1/object/public/${supabaseStorageBucket}/${params?.slug}.png`}
      />
      <main className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent font-semibold">
        <div>Built with Pavia</div>
      </main>
    </>
  )
}

export default Home
