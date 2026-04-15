import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: authError } = await (supabase.auth.signUp({ email, password, options: { data: { display_name: name } } }) as any)
    setLoading(false)
    if (authError) { setError(authError.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
          <h1 className="text-2xl font-bold mt-4" style={{ color: 'var(--color-text)' }}>Create your account</h1>
          <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>14-day free trial. No credit card.</p>
        </div>
        <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Get started free'}
            </Button>
          </form>
          <p className="text-sm text-center mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}