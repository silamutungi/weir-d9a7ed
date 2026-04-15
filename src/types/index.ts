export type MatchStatus = 'pending' | 'approved' | 'monetized' | 'taken_down'

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  username: string
  bio: string | null
  avatar_url: string | null
  platforms: string[]
  created_at: string
  deleted_at: string | null
}

export interface WeirMatch {
  id: string
  user_id: string
  platform: string
  url: string
  thumbnail_url: string | null
  title: string
  detected_at: string
  status: MatchStatus
  confidence_score: number
  is_deepfake: boolean
  estimated_cpm: number
  estimated_earnings: number
  views: number
  created_at: string
  deleted_at: string | null
}

export interface WeirEarning {
  id: string
  user_id: string
  match_id: string
  amount: number
  currency: string
  paid_at: string | null
  status: 'pending' | 'paid' | 'disputed'
  created_at: string
  deleted_at: string | null
}

export interface WeirLicense {
  id: string
  user_id: string
  name: string
  description: string
  price: number
  duration_days: number
  allowed_uses: string[]
  created_at: string
  deleted_at: string | null
}

export interface MetricCard {
  label: string
  value: string
  delta: string
  positive: boolean
}