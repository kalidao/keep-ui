import Connect from '@/components/connect-button'

import { AdminConsole } from './admin-console'

export default function Home() {
  return (
    <main className="flex bg-zinc-50 dark:bg-zinc-950 w-screen min-h-screen flex-col items-start justify-between px-2 py-4">
      <div className="flex-1 w-full h-full">
        <AdminConsole />
      </div>
      <footer className="flex flex-row justify-between w-full mt-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white text-mono">Admin Console</h1>
        <Connect />
      </footer>
    </main>
  )
}
