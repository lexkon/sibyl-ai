'use client'

import { ChangeEvent, useState, useRef } from "react";

export default function FileSelector() {
    const [file, setFile] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
    }

    const handleClearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFile(null);

        if (inputFileRef.current) {
            inputFileRef.current.value = "";
        }
    };

    const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("GENERATE MY STUFF")
    }

    return (
        <form onSubmit={handleGenerate} className='mx-auto max-w-sm md:max-w-md'>
            {/* <label htmlFor="audio-upload" className="text-sm mb-2 font-medium text-zinc-700 dark:text-zinc-300">
                Pick a file
            </label> */}
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
                    <p className="text-sm m-2 text-zinc-700">
                        Selected: <span className="font-medium">{file.name}</span>
                    </p>
                    <div className="">
                        <button
                            onClick={handleClearFile}
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