import { FileMap } from "../../enums/fileMap.ts";

const brainFoodList = async (): Promise<string[]> => (await Array.fromAsync(Deno.readDir(FileMap.BRAIN_FOOD)))
	.filter( x => x.isFile )
	.map(x => x.name);

export default brainFoodList;
