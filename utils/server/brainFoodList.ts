import { FileMap } from "../../enums/fileMap.ts";

const brainFoodList = async (brainName: string): Promise<string[]> => (await Array.fromAsync(Deno.readDir(`${FileMap.BRAIN_FOOD}/${brainName}`)))
	.filter( x => x.isFile )
	.map(x => x.name);

export default brainFoodList;

