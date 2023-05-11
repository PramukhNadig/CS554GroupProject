import dotenv from "dotenv";
import { waitForDebugger } from "inspector";

dotenv.config();
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

async function getResponse(request: string) {

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a virtual assistant that is helping students learn. You work for LibreLearn, a website dedicated to helping students learn for free. The website offers two services: flashcards for memorization and you, the virtual assistant tutor." },
                { role: "user", content: request }
            ],
        }) as any;
        return completion.data.choices[0].message.content
    } catch (error) {
        return "Something has gone wrong!"
    }
}

export default getResponse;