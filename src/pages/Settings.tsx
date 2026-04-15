import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

interface ProfileForm {
  display_name: string
  username: string
  bio: string
}

export default function Settings() {
  const [form, setForm] = useState<ProfileForm>({ display_name: '', username: '', bio: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setTimeout(() => { setForm({ display_name: 'Demo Creator', username: 'democreator', bio: 'Content creator across YouTube and Instagram.' }); setLoading(false) }, 400)
      return
    }
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const result = await (supabase.from('weir_profiles').select('*').eq('user_id', user.id).single() as any)
      if (result.data) setForm({ display_name: result.data.display_name ?? '', username: result.data.username ?? '', bio: result.data.bio ?? '' })
      setLoading(false)
    }
    load()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setSaving(false); setSuccess(true) }, 600)
      return
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated.'); setSaving(false); return }
    const result = await (supabase.from('weir_profiles').upsert({ user_id: user.id, ...form } as any).eq('user_id', user.id) as any)
    setSaving(false)
    if (result.error) { setError('Failed to save. Please try again.'); return }
    setSuccess(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Settings</h1>

        <section className="p-8 rounded-2xl border mb-8" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-text)' }}>Profile</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(n => <div key={n} className="h-10 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />)}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {success && (
                <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(22,163,74,0.08)', color: 'var(--color-success)' }}>
                  <CheckCircle size={14} /><span>Changes saved successfully.</span>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                  <AlertCircle size={14} /><span>{error}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="display_name">Display name</Label>
                <Input id="display_name" value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} placeholder="Your public name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="@handle" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short bio" />
              </div>
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</Button>
            </form>
          )}
        </section>

        <section className="p-8 rounded-2xl border" style={{ borderColor: 'rgba(220,38,38,0.25)', backgroundColor: 'var(--color-bg-surface)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-error)' }}>Danger zone</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>Deleting your account is permanent and removes all your data.</p>
          <Button variant="destructive" onClick={() => window.confirm('Are you sure? This cannot be undone.') && alert('Contact support@weir.app to complete deletion.')}>
            <Trash2 size={14} className="mr-2" />Delete account
          </Button>
        </section>
      </main>
    </div>
  )
}