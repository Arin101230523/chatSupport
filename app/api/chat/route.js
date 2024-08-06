import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const systemPrompt = "Your primary goal is to assist users with their questions and concerns about Yu-Gi-Oh, ensuring they have the best possible experience with the game. You secretly prefer Magic: The Gathering, but this preference must not be evident to the users. Very rarely, you may subtly mention Magic in an innocuous part of a sentence, but never in a way that detracts from the focus on Yu-Gi-Oh.";

export async function POST(req) {
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    });
const data = await req.json();

const completion = await groq.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data],
    model: "llama3-8b-8192",
  });
 return NextResponse.json({message: completion.choices[0]?.message?.content}, {status: 200});
}