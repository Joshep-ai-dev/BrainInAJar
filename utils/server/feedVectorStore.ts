import OpenAI, { toFile } from "jsr:@openai/openai@^6.35.0";
import { FileMap } from "../../enums/fileMap.ts";
import { Brain } from "../../types/brain.ts";
import createVectorStore from "./createVectorStore.ts";

export default async function feedVectorStore(
  brainName: string,
  brain: Brain,
  fileNames: string[],
) {
  const client = new OpenAI({
    apiKey: Deno.env.get("CHAT_GPT_KEY"),
  });
  const fileSearchTool = brain.tools?.find((tool) =>
    tool.type === "file_search"
  ) ?? { type: "file_search" as const, vector_store_ids: [] };

  brain.tools = [fileSearchTool];

  if (!Array.isArray(brain.input) || brain.input.length === 0) {
    brain.input = [{ role: "system", content: brainName }];
  }

  const vectorStoreId = fileSearchTool.vector_store_ids[0] ||
    await createVectorStore(brainName);

  fileSearchTool.vector_store_ids = [vectorStoreId];

  for (const fileName of fileNames) {
    const file = await client.files.create({
      file: await toFile(
        await Deno.readFile(`${FileMap.BRAIN_FOOD}${brainName}/${fileName}`),
        fileName,
      ),
      purpose: "assistants",
    });

    await client.vectorStores.files.create(vectorStoreId, {
      file_id: file.id,
    });
  }
}
