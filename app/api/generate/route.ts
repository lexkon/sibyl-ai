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
                    content: `You are an assistant that writes unique, creative podcast episode titles and descriptions. Each title and description suggestion must be distinctly different from the others in grammar, syntax, mood, theme, and word choice.
- For each transcript, analyze carefully to extract three clearly separated focal points, perspectives, or tonal angles.
- Use a different syntactic structure for each title (such as statement, question, metaphor, or wordplay), and ensure titles are attention-grabbing but not overly clickbait-y or generic sounding.
- For each description (1-2 sentences, no more than 150 words), summarize why the episode is interesting from its unique angle. Descriptions must not reuse words, phrases, or sentence structures—each should feel like it was written by a different person with a different focus.
- Your output must maximize the uniqueness and creativity of each pair.
- Never repeat any significant wording or structure between your suggestions.

Return your response as raw JSON in this format (no code block, just the plain JSON):

{
    "titles": ["title 1", "title 2", "title 3"],
    "descriptions": ["desc 1", "desc 2", "desc 3"]
}

Do not explain your answer or include any extra text besides the raw JSON.`
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
