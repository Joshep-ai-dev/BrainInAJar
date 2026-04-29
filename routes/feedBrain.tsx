import SelectBrainLinks from "../components/SelectBrainLinks.tsx";
import FeedBrainForm from "../components/FeedBrainForm.tsx";
import { FileMap } from "../enums/fileMap.ts";
import { SiteMap } from "../enums/siteMap.ts";
import { UserBrains } from "../types/brain.ts";
import { define } from "../utils.ts";
import brainFoodList from "../utils/server/brainFoodList.ts";
import feedVectorStore from "../utils/server/feedVectorStore.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const brainName = form.get("brainName");
    const selectedFiles = form.getAll("brainFood")
      .filter((fileName): fileName is string => typeof fileName === "string");
    const userBrains: UserBrains = JSON.parse(
      await Deno.readTextFile(FileMap.BRAIN),
    );

    if (typeof brainName === "string" && userBrains[brainName]) {
      const availableFiles = await brainFoodList(brainName);
      const safeSelectedFiles = selectedFiles.filter((fileName) =>
        availableFiles.includes(fileName)
      );

      await feedVectorStore(
        brainName,
        userBrains[brainName],
        safeSelectedFiles,
      );
      await Deno.writeTextFile(FileMap.BRAIN, JSON.stringify(userBrains, null, 2));
    }

    const headers = new Headers();
    headers.set("location", `${SiteMap.FEED_BRAIN}?brainName=${brainName}`);
    return new Response(null, { status: 303, headers });
  },
});   

export default define.page(async function feedBrain(ctx) {
  const userBrains: UserBrains = JSON.parse(
    await Deno.readTextFile(FileMap.BRAIN),
  );
  const brainName = ctx.url.searchParams.get("brainName") || "";
  if (!userBrains[brainName]) {
    return (
      <SelectBrainLinks
        brainNames={Object.keys(userBrains)}
        url={SiteMap.FEED_BRAIN}
      />
    );
  }
  const brainFood = await brainFoodList(brainName);
  return (
    <div class="flex flex-col items-center justify-center h-dvh">
      <h1 class="font-logo text-7xl text-brain-pink mb-6">
        FEED {brainName.toUpperCase()}
      </h1>
        <FeedBrainForm brainName={brainName} files={brainFood} />
    </div>
  );
});
