import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, DollarSign, Settings, LogOut } from 'lucide-react'

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
  const drawerRef = useRef<HTMLDivElement>(null)

  async function handleLogout() {
    if (isSupabaseConfigured) await (supabase.auth.signOut() as any)
    navigate('/login')
  }

  // Close drawer on outside click
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            WEIR
          </Link>

          {/* Desktop nav */}
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

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg gap-1.5 transition-colors duration-150"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text)',
                transform: open ? 'translateY(8px) rotate(45deg)' : 'none'
              }}
            />
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text)',
                opacity: open ? 0 : 1
              }}
            />
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text)',
                transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none'
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className="fixed inset-0 z-50 md:hidden"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden'
        }}
        aria-hidden={!open}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            opacity: open ? 1 : 0
          }}
          onClick={() => setOpen(false)}
        />

        {/* Slide-in drawer panel */}
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="absolute top-0 right-0 h-full w-72 flex flex-col shadow-2xl transition-transform duration-300 ease-out"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderLeft: '1px solid var(--color-border)',
            transform: open ? 'translateX(0)' : 'translateX(100%)'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-6 h-16 border-b flex-shrink-0"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <Link
              to="/"
              className="text-xl font-bold"
              style={{ color: 'var(--color-primary)' }}
              onClick={() => setOpen(false)}
            >
              WEIR
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 relative"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Close menu"
            >
              <span className="block h-0.5 w-4 rounded-full absolute" style={{ backgroundColor: 'var(--color-text-secondary)', transform: 'rotate(45deg)' }} />
              <span className="block h-0.5 w-4 rounded-full absolute" style={{ backgroundColor: 'var(--color-text-secondary)', transform: 'rotate(-45deg)' }} />
            </button>
          </div>

          {/* Drawer nav links */}
          <nav className="flex flex-col flex-1 px-4 py-4 gap-1 overflow-y-auto">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 relative"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                    backgroundColor: isActive ? 'rgba(30,64,175,0.08)' : 'transparent'
                  }}
                >
                  {/* Flame active indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  )}
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Drawer footer — sign out */}
          <div
            className="px-4 py-4 border-t flex-shrink-0"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <button
              onClick={() => { setOpen(false); handleLogout() }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-colors duration-150"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
