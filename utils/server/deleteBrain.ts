import OpenAI from "jsr:@openai/openai";
import { Brain, UserBrains } from "../../types/brain.ts";

const deleteVectorStore = async (brain: Brain) => {
	const TOOLS_VECTOR_OBJECT_INDEX = 0; //Index of object in brain.tools.
	const VECTOR_STORE_INDEX = 0; //Index of vector_store in vector_store_ids.
	const client = new OpenAI({
		apiKey: Deno.env.get("CHAT_GPT_KEY"),
	});
	const deletedVectorStore = await client.vectorStores.delete(brain.tools[TOOLS_VECTOR_OBJECT_INDEX].vector_store_ids[VECTOR_STORE_INDEX]);

	console.log(deletedVectorStore);
}


export async function deleteBrain(userBrains: UserBrains, brainName: string) {
	await deleteVectorStore(userBrains[brainName]);
	delete userBrains[brainName];
}
