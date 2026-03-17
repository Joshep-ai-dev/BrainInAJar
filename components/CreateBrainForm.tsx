import { BrainContextFormInput } from "../islands/BrainContextFormInput.tsx";
import { BrainModelFormInput } from "./BrainModelFormInput.tsx";
import BrainNameFormInput from "./BrainNameFormInput.tsx";
import { BrainReasoningInputForm } from "./BrainReasoningFormInput.tsx";

export function CreateBrainForm({url, chatModels}: {url: string, chatModels: string []}) {

	return (
		<form method="POST" action={url} class="font-cherrybomb text-brain-pink text-3xl">
			<BrainNameFormInput />
			<BrainReasoningInputForm/>
			<BrainContextFormInput/>
			<p class="mt-10 block">CHOOSE YOUR BRAIN MODEL</p>
			<BrainModelFormInput chatModels={chatModels} />
			<button type="submit" hidden>Submit</button>
		</form>
	);
}
