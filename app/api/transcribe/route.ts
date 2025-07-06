import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const audioFile = formData.get('audio') as File

        if (!audioFile) {
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: 'gpt-4o-mini-transcribe'
        })

        return NextResponse.json({ transcription: transcription.text })
    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
    }
}