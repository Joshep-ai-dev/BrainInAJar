import { FileMap } from "../enums/fileMap.ts";

export default function SelectBrainLinks({ brainNames, url }: { brainNames: string[], url: string }) {
	return (
		<div class="flex flex-col font-cherrybomb text-4xl items-center">
			<h1 class="font-logo text-8xl text-brain-pink">SELECT A BRAIN</h1>
			<div class="flex flex-col items-start">
				{
					brainNames.map((x: string, y: number) => {
						return (
							<a href={`${url}?brainName=${x}`} key={y}>
								<img src={FileMap.LOGO} alt="Cartoon image of a brain in a jar." class="w-12" />
								<span class="text-brain-text">{x.toUpperCase()}</span>
							</a>
						);
					})
				}
			</div>
		</div>
	);
}
