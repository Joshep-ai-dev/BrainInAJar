import { Partial } from "fresh/runtime";
import BrainLogo from "../components/BrainInAJarLogo.tsx";
import { define } from "../utils.ts";
import ChatForm from "../components/ChatForm.tsx";
import { SiteMap } from "../enums/siteMap.ts";
import getCookieValue from "../utils/server/getCookieValue.ts";
import { FileMap } from "../enums/fileMap.ts";
import { UserBrains } from "../types/brain.ts";
import SelectBrainLinks from "../components/SelectBrainLinks.tsx";
import Conversation from "../components/Conversation.tsx";

export default define.page(async function TalkToABrain(ctx) {
  const cookies = ctx.req.headers.get("cookie") || "";
  const userBrains: UserBrains = JSON.parse(
    await Deno.readTextFile(FileMap.BRAIN),
  );
  const brainName = ctx.url.searchParams.get("brainName") ||
    getCookieValue("brainName", cookies);

  if (!userBrains[brainName]) {
    return (
      <SelectBrainLinks
        brainNames={Object.keys(userBrains)}
        url={SiteMap.TALK_TO_A_BRAIN}
      />
    );
  }

  const brain = userBrains[brainName];

  return (
    <div class="px-4 py-8 mx-auto h-fit">
      <BrainLogo />
      <div class="mx-auto flex flex-col items-center w-[65dvw] h-fit min-h-[90dvh] bg-black py-4">
        <div class="mx-2 flex flex-col" f-client-nav>
          <Partial name="chatResponse">
            {(brain.conversation || []).map((message) => (
              <div class="max-w-[50dvw] font-conversation text-2xl">
                <Conversation brainName={brainName} message={message} />
              </div>
            ))}
          </Partial>
          <Partial name="chatResponseForm">
            <ChatForm url={SiteMap.CONVERSATION} brainName={brainName} />
          </Partial>
        </div>
      </div>
    </div>
  );
});
