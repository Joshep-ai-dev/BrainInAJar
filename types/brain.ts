export interface Conversation {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface BrainChatMessage {
  id: string;
  userMessage: string;
  agentMessage: string;
  responseId: string;
  createdAt: string;
}

export type Reasoning =
  | "none"
  | "minimal"
  | "low"
  | "medium"
  | "high"
  | "xhigh";

export interface Brain {
  model: string;
  reasoning: {
    effort: "none" | "minimal" | "low" | "medium" | "high" | "xhigh";
  };
  tools: [{ type: "file_search"; vector_store_ids: string[] | [] }];
  input: Conversation[];
  conversation?: BrainChatMessage[];
}

export interface UserBrains {
  [brainName: string]: Brain;
}
