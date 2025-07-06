import FileSelector from "@/components/FileSelector"

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="pt-8 mb-4 text-6xl font-heading text-zinc-800 dark:text-zinc-300">Sibyl</h1>
      <h1 className="mb-8 text-3xl font-heading text-zinc-700 dark:text-zinc-300">Generate podcast titles and description</h1>
      <FileSelector />
    </main>
  )
}
