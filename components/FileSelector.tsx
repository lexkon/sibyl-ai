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

    return (
        <div className='mx-auto max-w-sm md:max-w-md'>
            <div id='file-handler' className="flex flex-col items-start">
                <label htmlFor="audio-upload" className="text-sm mb-2 font-medium text-zinc-700">
                    Pick a file
                </label>

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
                    <div className="flex flex-row items-center">
                        <p className="text-sm mt-2 text-zinc-700">
                            Selected: <span className="font-medium">{file.name}</span>
                        </p>
                        <button className="ml-2 rounded bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:cursor-pointer" onClick={handleClearFile}>Clear</button>
                    </div>
                )}
            </div>
        </div>
    )
}