import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="h-[60px] sticky top-0 z-10 bg-[var(--color-background-primary)] border-b-[0.5px] border-[var(--color-border-tertiary)] flex items-center px-6">
      <div className="max-w-[900px] w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo-v2.png"
              alt="Light Vector Logo"
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>
          <span className="font-mono text-[14px] font-bold tracking-tight text-[var(--color-text-primary)]">Light Vector</span>
        </Link>
        <div className="flex items-center gap-6 text-[13px] text-[var(--color-text-secondary)]">
          <Link href="/simulateurs" className="hover:text-[var(--color-text-primary)] hover:underline">Simulateurs</Link>
          <Link href="/circuit" className="hover:text-[var(--color-text-primary)] hover:underline">Circuit</Link>
          <Link href="/companion" className="hover:text-[var(--color-text-primary)] hover:underline">Companion</Link>
        </div>
        <Link 
          href="/simulateurs" 
          style={{ backgroundColor: '#047857' }}
          className="text-white px-[18px] py-[10px] rounded-md text-[13px] font-bold hover:opacity-90 transition-all whitespace-nowrap shadow-md"
        >
          Commencer
        </Link>
      </div>
    </nav>
  )
}
