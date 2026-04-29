import OpenAI from "jsr:@openai/openai@^6.35.0";
import { Brain } from "../../types/brain.ts";

interface NextBrainResponse {
  responseId: string;
  agentMessage: string;
}

export default async function nextBrainResponse(
  brain: Brain,
  userMessage: string,
): Promise<NextBrainResponse> {
  const client = new OpenAI({
    apiKey: Deno.env.get("CHAT_GPT_KEY"),
  });
  const conversationInput = [
    ...brain.input,
    ...(brain.conversation || []).flatMap(({ userMessage, agentMessage }) => [
      { role: "user" as const, content: userMessage },
      { role: "assistant" as const, content: agentMessage },
    ]),
    { role: "user" as const, content: userMessage },
  ];
  const response = await client.responses.create({
    model: brain.model,
    reasoning: brain.reasoning,
    tools: brain.tools,
    input: conversationInput,
  });

  return {
    responseId: response.id,
    agentMessage: response.output_text || "I could not find a text response.",
  };
}
