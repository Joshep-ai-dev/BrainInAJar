export default function ChatForm(
  { url, brainName }: { url: string; brainName: string },
) {
  return (
    <form class="text-center my-3" method="GET" action={url} f-partial={url}>
      <input type="hidden" name="brainName" value={brainName} />
      <input name="userMessage" class="bg-white" autofocus />
      <button type="submit" hidden></button>
    </form>
  );
}
