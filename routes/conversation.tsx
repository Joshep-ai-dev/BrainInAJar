import { Partial } from "fresh/runtime";
import { define } from "../utils.ts";
import Conversation from "../components/Conversation.tsx";
import ChatForm from "../components/ChatForm.tsx";
import { SiteMap } from "../enums/siteMap.ts";
import { FileMap } from "../enums/fileMap.ts";
import { UserBrains } from "../types/brain.ts";
import nextBrainResponse from "../utils/server/nextBrainResponse.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const brainName = form.get("brainName");
    const messageId = form.get("messageId");
    const userBrains: UserBrains = JSON.parse(
      await Deno.readTextFile(FileMap.BRAIN),
    );

    if (
      typeof brainName === "string" && typeof messageId === "string" &&
      userBrains[brainName]
    ) {
      userBrains[brainName].conversation =
        (userBrains[brainName].conversation || []).filter((message) =>
          message.id !== messageId
        );
      await Deno.writeTextFile(FileMap.BRAIN, JSON.stringify(userBrains));
    }

    const headers = new Headers();
    headers.set(
      "location",
      `${SiteMap.TALK_TO_A_BRAIN}?brainName=${brainName}`,
    );
    return new Response(null, { status: 303, headers });
  },
});

export default define.page(async (ctx) => {
  const brainName = ctx.url.searchParams.get("brainName") || "";
  const userMessage = ctx.url.searchParams.get("userMessage") || "";
  const userBrains: UserBrains = JSON.parse(
    await Deno.readTextFile(FileMap.BRAIN),
  );
  const formKey = crypto.randomUUID();

  if (!userBrains[brainName] || !userMessage.trim()) {
    return (
      <Partial name="chatResponseForm">
        <ChatForm
          url={SiteMap.CONVERSATION}
          key={formKey}
          brainName={brainName}
        />
      </Partial>
    );
  }

  const brain = userBrains[brainName];
  const response = await nextBrainResponse(brain, userMessage);
  const message = {
    id: crypto.randomUUID(),
    userMessage,
    agentMessage: response.agentMessage,
    responseId: response.responseId,
    createdAt: new Date().toISOString(),
  };

  brain.conversation = [...(brain.conversation || []), message];
  await Deno.writeTextFile(FileMap.BRAIN, JSON.stringify(userBrains));

  return (
    <div>
      <Partial name="chatResponse" mode="append">
        <div class="max-w-[50dvw] font-conversation text-2xl">
          <Conversation brainName={brainName} message={message} />
        </div>
      </Partial>
      <Partial name="chatResponseForm">
        <ChatForm
          url={SiteMap.CONVERSATION}
          key={formKey}
          brainName={brainName}
        /> 
      </Partial>
    </div>
  );
});
