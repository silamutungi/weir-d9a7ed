import { useEffect, useState } from 'react'
import { Shield, DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatNumber, timeAgo } from '../lib/utils'
import { type WeirMatch } from '../types'
import Navbar from '../components/Navbar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const SEED_MATCHES: WeirMatch[] = [
  { id: '1', user_id: 'seed', platform: 'Instagram', url: 'https://instagram.com', thumbnail_url: null, title: 'Brand ad using your face without permission', detected_at: new Date(Date.now() - 3600000).toISOString(), status: 'pending', confidence_score: 97, is_deepfake: false, estimated_cpm: 4.2, estimated_earnings: 840, views: 200000, created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'seed', platform: 'TikTok', url: 'https://tiktok.com', thumbnail_url: null, title: 'Deepfake endorsement video — fitness brand', detected_at: new Date(Date.now() - 7200000).toISOString(), status: 'pending', confidence_score: 99, is_deepfake: true, estimated_cpm: 6.1, estimated_earnings: 1830, views: 300000, created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'seed', platform: 'YouTube', url: 'https://youtube.com', thumbnail_url: null, title: 'Compilation video featuring your content', detected_at: new Date(Date.now() - 86400000).toISOString(), status: 'monetized', confidence_score: 91, is_deepfake: false, estimated_cpm: 3.8, estimated_earnings: 570, views: 150000, created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'seed', platform: 'Facebook', url: 'https://facebook.com', thumbnail_url: null, title: 'Sponsored post using your image', detected_at: new Date(Date.now() - 172800000).toISOString(), status: 'taken_down', confidence_score: 88, is_deepfake: false, estimated_cpm: 2.5, estimated_earnings: 250, views: 100000, created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'seed', platform: 'Twitter', url: 'https://twitter.com', thumbnail_url: null, title: 'Political ad using your likeness', detected_at: new Date(Date.now() - 259200000).toISOString(), status: 'pending', confidence_score: 94, is_deepfake: true, estimated_cpm: 5.0, estimated_earnings: 1000, views: 200000, created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'seed', platform: 'YouTube', url: 'https://youtube.com', thumbnail_url: null, title: 'Approved brand partnership content', detected_at: new Date(Date.now() - 345600000).toISOString(), status: 'approved', confidence_score: 95, is_deepfake: false, estimated_cpm: 4.0, estimated_earnings: 800, views: 200000, created_at: new Date().toISOString(), deleted_at: null }
]

const STATUS_CONFIG: Record<WeirMatch['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'outline' },
  approved: { label: 'Approved', variant: 'secondary' },
  monetized: { label: 'Monetized', variant: 'default' },
  taken_down: { label: 'Taken Down', variant: 'destructive' }
}

export default function Dashboard() {
  const [matches, setMatches] = useState<WeirMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadMatches()
  }, [])

  async function loadMatches() {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setMatches(SEED_MATCHES); setLoading(false) }, 600)
      return
    }
    const result = await (supabase.from('weir_matches').select('*').is('deleted_at', null).order('detected_at', { ascending: false }) as any)
    if (result.error) { setError('Failed to load matches. Please try again.'); setLoading(false); return }
    setMatches(result.data ?? [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: WeirMatch['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      setActionLoading(null)
      return
    }
    await (supabase.from('weir_matches').update({ status } as any).eq('id', id) as any)
    setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m))
    setActionLoading(null)
  }

  const totalEarnings = matches.filter(m => m.status === 'monetized').reduce((s, m) => s + m.estimated_earnings, 0)
  const pendingCount = matches.filter(m => m.status === 'pending').length
  const deepfakeCount = matches.filter(m => m.is_deepfake).length
  const totalViews = matches.reduce((s, m) => s + m.views, 0)

  const metrics = [
    { label: 'Earned this month', value: formatCurrency(totalEarnings), delta: '+12%', positive: true, icon: DollarSign },
    { label: 'Pending matches', value: String(pendingCount), delta: `${matches.length} total`, positive: false, icon: Eye },
    { label: 'Deepfakes detected', value: String(deepfakeCount), delta: 'Needs action', positive: false, icon: AlertTriangle },
    { label: 'Total reach', value: formatNumber(totalViews), delta: 'Across all platforms', positive: true, icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        {!isSupabaseConfigured && (
          <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(8,145,178,0.10)', color: 'var(--color-accent)', border: '1px solid rgba(8,145,178,0.25)' }}>
            Viewing sample data — connect your database to go live.
          </div>
        )}
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Identity Monitor</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {metrics.map(m => (
            <div key={m.label} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{m.label}</span>
                <m.icon size={16} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{m.value}</div>
              <div className="text-xs mt-1" style={{ color: m.positive ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{m.delta}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Recent Detections</h2>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-20 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--color-bg-surface)' }} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--color-border)' }}>
            <AlertTriangle size={24} className="mx-auto mb-3" style={{ color: 'var(--color-error)' }} />
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <Button variant="outline" size="sm" onClick={loadMatches}>Retry</Button>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="p-10 rounded-xl border text-center" style={{ borderColor: 'var(--color-border)' }}>
            <Shield size={32} className="mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
            <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>No detections yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is scanning the web for your identity. Check back shortly.</p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <div className="space-y-3">
            {matches.map(match => (
              <div key={match.id} className="p-5 rounded-xl border flex flex-col md:flex-row md:items-center gap-4" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{match.title}</span>
                    {match.is_deepfake && <Badge variant="destructive">Deepfake</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{match.platform}</span>
                    <span>{timeAgo(match.detected_at)}</span>
                    <span>{formatNumber(match.views)} views</span>
                    <span style={{ color: 'var(--color-success)' }}>{formatCurrency(match.estimated_earnings)} est.</span>
                    <span>{match.confidence_score}% confidence</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <Badge variant={STATUS_CONFIG[match.status].variant}>{STATUS_CONFIG[match.status].label}</Badge>
                  {match.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'monetized')}>
                        <DollarSign size={12} className="mr-1" />Monetize
                      </Button>
                      <Button size="sm" variant="outline" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'approved')}>
                        <CheckCircle size={12} className="mr-1" />Approve
                      </Button>
                      <Button size="sm" variant="destructive" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'taken_down')}>
                        <XCircle size={12} className="mr-1" />Take Down
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}