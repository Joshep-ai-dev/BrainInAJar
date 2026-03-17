import SelectBrainLinks from "../components/SelectBrainLinks.tsx";
import { FileMap } from "../enums/fileMap.ts";
import { SiteMap } from "../enums/siteMap.ts";
import { UserBrains } from "../types/brain.ts";
import { define } from "../utils.ts";
import brainFoodList from "../utils/server/brainFoodList.ts";

export default define.page(async function feedBrain(ctx) {
	const userBrains: UserBrains = JSON.parse( await Deno.readTextFile(FileMap.BRAIN) );
	const brainName = ctx.url.searchParams.get("brainName") || "";

	if (!userBrains[brainName]) {
		return <SelectBrainLinks brainNames={Object.keys(userBrains)} url={SiteMap.FEED_BRAIN} />
	}

	const brain = userBrains[brainName];
	const brainFood = await brainFoodList();
	console.log(brain);

	return (
		<div class="flex flex-col items-center justify-center h-dvh">
			<div class="flex flex-col items-start">
				{
					brainFood.map((x,y) => 
						<p key={y} class="text-amber-500 font-cherrybomb text-2xl">{x.charAt(0).toUpperCase() + x.slice(1)}</p>
				)}
			</div>
		</div>
	);
});
