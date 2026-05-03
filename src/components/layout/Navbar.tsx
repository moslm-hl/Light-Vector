import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="h-[52px] sticky top-0 z-10 bg-[var(--color-background-primary)] border-b-[0.5px] border-[var(--color-border-tertiary)] flex items-center px-6">
      <div className="max-w-[900px] w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1D9E75]"></span>
          <span className="font-mono text-[15px] font-medium">EconoSim</span>
        </Link>
        <div className="flex items-center gap-6 text-[13px] text-[var(--color-text-secondary)]">
          <Link href="/simulateurs" className="hover:text-[var(--color-text-primary)] hover:underline">Simulateurs</Link>
          <Link href="/circuit" className="hover:text-[var(--color-text-primary)] hover:underline">Circuit</Link>
          <Link href="/companion" className="hover:text-[var(--color-text-primary)] hover:underline">Companion</Link>
        </div>
        <Link href="/simulateurs" className="bg-[#1D9E75] text-white px-[14px] py-[6px] rounded-md text-[13px] font-medium hover:bg-[#188562] transition-colors">
          Commencer
        </Link>
      </div>
    </nav>
  )
}
