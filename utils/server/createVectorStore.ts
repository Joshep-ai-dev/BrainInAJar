import OpenAI from "jsr:@openai/openai";

export default async function createVectorStore(brainName: string): Promise<string> {
	const client = new OpenAI({
		apiKey: Deno.env.get("CHAT_GPT_KEY")
	});
	const vectorStore = await client
		.vectorStores
		.create({
		name: brainName,
	});

	return vectorStore.id;
}
