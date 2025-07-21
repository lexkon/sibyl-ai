'use client'

import { useState } from "react"
import FileSelector from "@/components/FileSelector"

export default function Home() {
  const [transcription, setTranscription] = useState('')
  const [titleSuggestsions, setTitleSuggestions] = useState<string[]>([])
  const [descriptionsSuggestions, setDescriptionSuggestions] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const clearAll = () => {
    setTranscription('')
    setTitleSuggestions([])
    setDescriptionSuggestions([])
  }


  async function generateTitlesAndDescriptions(transcription: string) {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcription }),
    });

    const data = await res.json()
    const { titles, descriptions } = JSON.parse(data.suggestions)

    setTitleSuggestions(titles)
    setDescriptionSuggestions(descriptions)
    return data;
  }

  return (
    <main className="text-center">
      <h1 className="mt-12 mb-4 text-6xl font-heading text-zinc-950 dark:text-zinc-300">Sibyl</h1>
      <h1 className="mb-8 text-3xl font-heading text-zinc-800 dark:text-zinc-300">Generate podcast titles and descriptions</h1>

      <FileSelector setTranscription={setTranscription} clearAll={clearAll} />

      <hr className="max-w-50 mx-auto my-4 border-zinc-300 dark:border-zinc-600" />

      {transcription && (
        <div className='m-4 text-left md:max-w-xl lg:max-w-4xl max-w-sm mx-auto mb-32'>
          <h3 className='text-2xl mb-2 font-heading text-zinc-950 dark:text-zinc-300'>Transcription</h3>

          <button
            onClick={handleCopy}
            className="mb-2 rounded bg-zinc-100 px-4 py-2 text-sans text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:cursor-pointer"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>


          <p className="font-sans text-md tracking-tight text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
            {transcription}
          </p>

          <hr className="max-w-50 mx-auto my-4 border-zinc-300 dark:border-zinc-600" />

          <h3 className='text-2xl my-2 font-heading text-zinc-950 dark:text-zinc-300'>Title & Description Suggestions</h3>

          <button
            onClick={() => generateTitlesAndDescriptions(transcription)}
            className="mb-2 rounded bg-zinc-100 px-4 py-2 text-sans text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:cursor-pointer"
          >
            Generate
          </button>

          <h3 className='text-2xl my-2 font-heading text-zinc-950 dark:text-zinc-300'>Titles</h3>
          <ol>
            {titleSuggestsions.map((title, index) => (
              <li key={index} className="list-decimal list-inside font-sans text-md tracking-tight text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap mb-2">
                {title}
              </li>
            ))}
          </ol>

          <br></br>

          <h3 className='text-2xl my-2 font-heading text-zinc-950 dark:text-zinc-300'>Descriptions</h3>
          <ol>
            {descriptionsSuggestions.map((description, index) => (
              <li key={index} className="list-decimal list-inside font-sans text-md tracking-tight text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap mb-2">
                {description}
              </li>
            ))}
          </ol>

        </div>
      )
      }
    </main >
  )
}
