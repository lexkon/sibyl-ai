import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
    try {
        const { transcription } = await request.json();

        if (!transcription) {
            return NextResponse.json({ error: 'No transcription provided' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are an assistant that writes creative podcast titles and descriptions.',
                },
                {
                    role: 'user',
                    content: `Here is a podcast transcript;

${transcription}

Please return your response in the following JSON format, not in a code block marked by backticks but just raw JSON:

{
  "titles": ["title 1", "title 2", "title 3"],
  "descriptions": ["desc 1", "desc 2", "desc 3"]
}
`
                },
            ],
            temperature: 0.7,
        });

        return NextResponse.json({ suggestions: completion.choices[0].message.content });

    } catch (error) {
        console.error('Metadata generation error:', error);
        return NextResponse.json({ error: 'Failed to generate titles and descriptions' }, { status: 500 });
    }
}
