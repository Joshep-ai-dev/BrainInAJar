import AgentMessage from "./AgentMesssage.tsx";
import UserMessage from "./UserMessage.tsx";
import { SiteMap } from "../enums/siteMap.ts";
import { BrainChatMessage } from "../types/brain.ts";

export default function Conversation(
  { brainName, message }: { brainName: string; message: BrainChatMessage },
) {
  return (
    <div class="flex flex-col items-start">
      <UserMessage userMessage={message.userMessage} />
      <AgentMessage agentMessage={message.agentMessage} />
      <form method="POST" action={SiteMap.CONVERSATION}>
        <input type="hidden" name="brainName" value={brainName} />
        <input type="hidden" name="messageId" value={message.id} />
        <button
          type="submit"
          class="text-brain-pink font-chakra text-sm pb-3 hover:text-brain-text"
        >
          Delete this part
        </button>
      </form>
    </div>
  );
}
