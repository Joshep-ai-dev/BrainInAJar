import SelectBrainLinks from "../components/SelectBrainLinks.tsx";
import { FileMap } from "../enums/fileMap.ts";
import { SiteMap } from "../enums/siteMap.ts";
import { UserBrains } from "../types/brain.ts";
import { define } from "../utils.ts";

export default define.page(async function feedBrain(ctx) {
	const userBrains: UserBrains = JSON.parse( await Deno.readTextFile(FileMap.BRAIN) );
	const brainName = ctx.url.searchParams.get("brainName");

	if (!brainName) {
		return <SelectBrainLinks brainNames={Object.keys(userBrains)} url={SiteMap.FEED_BRAIN} />
	}

	return <p>{userBrains[brainName].model}</p>
});
