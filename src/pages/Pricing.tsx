import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free forever',
    description: 'For creators just starting to protect their identity.',
    features: ['Up to 50 matches/month', '3 platform scans', 'Manual takedown requests', 'Basic earnings tracker', 'Email alerts'],
    cta: 'Start free',
    highlight: false
  },
  {
    name: 'Pro',
    price: 29,
    period: 'per month',
    description: 'For active creators serious about monetizing their identity.',
    features: ['Unlimited matches', '15+ platform scans', 'One-tap DMCA takedowns', 'Deepfake detection', 'Licensing templates', 'CPM + earnings dashboard', 'Priority support'],
    cta: 'Start free trial',
    highlight: true
  },
  {
    name: 'Elite',
    price: 99,
    period: 'per month',
    description: 'For high-profile creators and talent agencies.',
    features: ['Everything in Pro', 'Real-time scanning (sub-5min)', 'AI benchmarking reports', 'Automated licensing proposals', 'Dedicated account manager', 'Custom reporting', 'API access'],
    cta: 'Contact sales',
    highlight: false
  }
]

const faqs = [
  { q: 'How does WEIR detect unauthorized use?', a: 'Our AI scans 50+ platforms continuously, matching your visual identity against public content using computer vision and metadata analysis.' },
  { q: 'What happens when a match is found?', a: 'You get an instant alert. From your dashboard you can approve, monetize with a licensing proposal, or issue a DMCA takedown in one tap.' },
  { q: 'How do I get paid for monetized content?', a: 'Licensing fees are collected by WEIR and paid out monthly via Stripe. We take a 10% platform fee.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel at any time from Settings. No lock-in, no cancellation fees.' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Simple, honest pricing</h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Start free. Upgrade when your identity earns you money.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="p-8 rounded-2xl border flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderColor: plan.highlight ? 'var(--color-primary)' : 'var(--color-border)',
                boxShadow: plan.highlight ? '0 0 0 2px var(--color-primary)' : 'none'
              }}
            >
              {plan.highlight && <span className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>Most popular</span>}
              <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{plan.name}</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                {plan.price > 0 && <span className="text-sm ml-2" style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>}
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{faq.q}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}