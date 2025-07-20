'use client'

import { ChangeEvent, useState, useRef } from "react";

interface FileSelectorProps {
    setTranscription: (transcription: string) => void;
}

export default function FileSelector({ setTranscription }: FileSelectorProps) {
    const [file, setFile] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
    }

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFile(null);
        setTranscription('')
        if (inputFileRef.current) {
            inputFileRef.current.value = "";
        }
    };

    const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!file) {
            return
        }

        try {
            const formData = new FormData()
            formData.append('audio', file)

            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            setTranscription(result.transcription)
            return result.transcription
        } catch (err) {
            console.log(err, "<-- ERROR")
        }
    }

    return (
        <form onSubmit={handleGenerate} className='mb-8 mx-auto max-w-sm md:max-w-md'>
            <label
                htmlFor="audio-upload"
                className="cursor-pointer rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200"
            >
                Choose your podcast episode
            </label>
            <input
                ref={inputFileRef}
                id="audio-upload"
                name="audio-upload"
                type="file"
                accept="audio/mpeg,audio/wav,audio/mp4"
                className="hidden"
                onChange={handleFileChange}
            />

            {file && (
                <>
                    <p className="text-sm m-4 text-zinc-700">
                        Selected: <span className="font-medium">{file.name}</span>
                    </p>
                    <div className="">
                        <button
                            onClick={handleReset}
                            className="mr-2 rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:cursor-pointer"
                        >
                            Clear
                        </button>
                        <button
                            type='submit'
                            disabled={!file}
                            className="ml-2 rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:cursor-pointer"
                        >
                            Generate
                        </button>
                    </div>
                </>

            )
            }
        </form >
    )
}