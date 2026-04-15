import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pricing', label: 'Pricing', icon: DollarSign },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) await (supabase.auth.signOut() as any)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{
                color: location.pathname === to ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                backgroundColor: location.pathname === to ? 'rgba(30,64,175,0.08)' : 'transparent'
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={14} className="mr-1.5" aria-hidden="true" />Sign out
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--color-text)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-6 py-4 text-sm font-medium border-b"
              style={{ color: location.pathname === to ? 'var(--color-primary)' : 'var(--color-text)', borderColor: 'var(--color-border)' }}
            >
              <Icon size={16} />{label}
            </Link>
          ))}
          <button
            onClick={() => { setOpen(false); handleLogout() }}
            className="flex items-center gap-3 px-6 py-4 text-sm font-medium w-full"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <LogOut size={16} />Sign out
          </button>
        </div>
      )}
    </header>
  )
}