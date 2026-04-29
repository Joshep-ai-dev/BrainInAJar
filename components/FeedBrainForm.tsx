export default function FeedBrainForm(
  { brainName, files }: { brainName: string; files: string[] },
) {
  return (
    <form method="POST" action="/feedBrain" class="flex flex-col gap-4">
      <input type="hidden" name="brainName" value={brainName} />
      <div class="flex flex-col items-start gap-2">
        {files.map((fileName) => (
          <label
            key={fileName}
            class="flex items-center gap-3 text-amber-500 font-cherrybomb text-2xl"
          >
            <input type="checkbox" name="brainFood" value={fileName} />
            <span>{fileName.charAt(0).toUpperCase() + fileName.slice(1)}</span>
          </label>
        ))}
      </div>
      {/* <button
        type="submit"
        class="text-brain-text font-cherrybomb text-3xl hover:text-brain-pink"
      >
        CREATE VECTOR STORE
      </button> */}
      {files.length === 0
          && (
           <p class="text-brain-text font-cherrybomb text-3xl">
             No files found in your feedBrain folder.
           </p>
          )
        }
    </form>
  );
}
