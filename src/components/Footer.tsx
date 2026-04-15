import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</span>
        <nav className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/login" className="hover:underline">Sign in</Link>
          <Link to="/signup" className="hover:underline">Start free</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}