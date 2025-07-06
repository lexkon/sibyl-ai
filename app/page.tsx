'use client'

import { useState } from "react"
import FileSelector from "@/components/FileSelector"

export default function Home() {
  const [transcription, setTranscription] = useState('')

  return (
    <main className="text-center">
      <h1 className="pt-8 mb-4 text-6xl font-heading text-zinc-800 dark:text-zinc-300">Sibyl</h1>
      <h1 className="mb-8 text-3xl font-heading text-zinc-700 dark:text-zinc-300">Generate podcast titles and descriptions</h1>
      <FileSelector setTranscription={setTranscription} />
      {transcription && (
        <>
          <div className='m-4 text-left max-w-md m-x-auto'>
            <h3 className='text-2xl font-heading text-zinc-800'>Episode transcription</h3>
            <p className="font-sans tracking-tight text-zinc-700">{transcription}</p>
          </div>
        </>
      )
      }
    </main>
  )
}
