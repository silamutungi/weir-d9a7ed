import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const HERO_URL = 'https://images.unsplash.com/photo-1657412235086-c2de1a1176a9?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMGluJTIwbW9kZXJuJTIwc3R1ZGlvJTIwbGlnaHRpbmclMkMlMjBzdXJyb3VuZGVkJTIwYnl8ZW58MHwwfHx8MTc3NjIyNjc2N3ww&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format'

const features = [
  { icon: Eye, title: 'Real-Time AI Scanning', desc: 'Continuous web and social monitoring detects unauthorized use of your identity within minutes, not days.' },
  { icon: Zap, title: 'One-Tap Actions', desc: 'Approve, monetize, or issue DMCA takedowns with a single tap. No legal knowledge required.' },
  { icon: DollarSign, title: 'Earnings Dashboard', desc: 'CPM tracking and payment history across every platform that uses your likeness.' },
  { icon: Shield, title: 'Deepfake Detection', desc: 'Proactive AI identifies synthetic content before it spreads — competitors only react after the fact.' },
  { icon: FileText, title: 'Licensing Templates', desc: 'Send automated licensing proposals when unauthorized use is detected. Turn infringement into income.' },
  { icon: TrendingUp, title: 'Creator Benchmarking', desc: 'See your lost earnings opportunity and how you rank against creators in your tier.' }
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }}>WEIR</span>
          <div className="flex items-center gap-2">
            <Link to="/pricing">
              <Button variant="ghost" size="sm">Pricing</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Start free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section
        style={{ backgroundImage: `url(${HERO_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)', letterSpacing: 'var(--tracking-overline)' }}>Name, Image &amp; Likeness Protection</span>
            <h1 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 'var(--leading-tight)', color: '#FFFFFF' }}>
              Stop losing money<br />to unauthorized use<br />of your identity.
            </h1>
            <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: 'var(--leading-relaxed)' }}>
              WEIR scans 50+ platforms in real time, detects deepfakes and unauthorized ads, then gives you one-tap tools to approve, monetize, or take down every match.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg">Get your dashboard</Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-gray-900 hover:text-gray-900">See pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Everything you need to own your likeness</h2>
          <p className="text-lg mb-12" style={{ color: 'var(--color-text-secondary)' }}>Built for creators across every platform — not just college athletes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border transition-transform duration-200 hover:-translate-y-1" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(30,64,175,0.10)' }}>
                  <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Start protecting your identity today</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>Free 14-day trial. No credit card required.</p>
          <Link to="/signup">
            <Button size="lg">Start free</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}