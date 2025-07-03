import FileSelector from "@/components/FileSelector"

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="p-8 text-6xl font-heading text-zinc-800 dark:text-zinc-300">Sibyl</h1>
      <FileSelector />
    </main>
  )
}
