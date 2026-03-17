import { define } from "../utils.ts";
import { FileMap } from "../enums/fileMap.ts";
import { UserBrains, Reasoning } from "../types/brain.ts";
import { CreateBrainsFields } from "../enums/createBrainsFields.ts";
import chatModelList from "../utils/server/chatModelList.ts";
import { CreateBrainForm } from "../components/CreateBrainForm.tsx";


export const handler = define.handlers({
	async POST(ctx) {
		const form = await ctx.req.formData();
		const name = form.get(CreateBrainsFields.NAME);
		const model = form.get(CreateBrainsFields.MODEL);
		const system_role = form.get(CreateBrainsFields.SYSTEM);
		const reasoning = form.get(CreateBrainsFields.REASONING);
		const userBrains: UserBrains = JSON.parse(await Deno.readTextFile(FileMap.BRAIN));
		//[name, model, reasoning, system_role].forEach(x => console.log(`${x}: ${typeof x === "string"}`));

		if (typeof name === "string" && typeof model === "string" && typeof reasoning === "string" && typeof system_role === "string") {
			const effort = reasoning as Reasoning;

			if (!Object.hasOwn(userBrains, name)) {
				userBrains[name] = {
					model,
					reasoning: {effort},
					tools: [{type: "file_search", vector_store_ids: []}],
					input: [{role: "system", content: system_role}]
				}

				Deno.writeTextFile(FileMap.BRAIN, JSON.stringify(userBrains));
			}
		}

		const headers = new Headers();
		headers.set("location", "/createBrain");
		return new Response(null, { status: 303, headers });
	},
});


export default define.page(async (_ctx) => {
	const userBrains: UserBrains = JSON.parse(await Deno.readTextFile(FileMap.BRAIN));
	const brainList = Object.keys(userBrains);
	const chatModels: string[] = await chatModelList(); 

	return (
		<div class="flex flex-col items-center pt-9 gap-6">
			<h1 class="text-center text-brain-pink text-6xl font-logo">CREATE A NEW BRAIN!</h1>
			<h2 class="text-brain-pink font-cherrybomb text-4xl ">YOUR CURRENT BRAINS</h2>
			<div class="flex flex-col items-start">
				{
					brainList.length === 0 ? <p class="font-chakra text-brain-text font-bold text-2xl">You currently have no brains! Don't worry you are in the right place!</p>: brainList.map((x, y) => 
						<p class="text-2xl text-amber-200 font-chakra" key={y}>{x}</p>
					)
				}
			</div>
			<CreateBrainForm url="/createBrain" chatModels={chatModels}/>
		</div>
	);
		
});
