import React, { Suspense } from "react"
import Image from "next/image"

interface Props {
  params: any
  searchParams: any
}

function Home(props: Props) {
  const { params, searchParams } = props
  const supabaseStorageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET
  const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
  return (
    <>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Image
            fill
            alt=""
            src={`${supabaseProjectUrl}/storage/v1/object/public/${supabaseStorageBucket}/${params?.slug}.png`}
          />
        </Suspense>
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent font-semibold">
          <div>Built with Pavia</div>
        </div>
      </main>
    </>
  )
}

export default Home
