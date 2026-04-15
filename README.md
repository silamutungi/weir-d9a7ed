# WEIR

> Built with [Visila](https://visila.com)

## What this app does

<!-- One sentence describing the core problem this solves -->

## Top user stories

- As a user, I can sign up and log in securely
- As a user, I can [core feature 1]
- As a user, I can [core feature 2]
- As a user, I can manage my account and data
- As a user, I can access the app on any device

## Run locally

```bash
npm install
cp .env.example .env  # fill in your Supabase keys
npm run dev
```

## Deploy

This app auto-deploys to Vercel on every push to main.
Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables.

## You own everything

GitHub: https://github.com/silamutungi/weir-d9a7ed
Vercel: https://vercel.com/dashboard
Supabase: https://supabase.com/dashboard

Visila provisioned this. You own it entirely.

## Next Steps

### Deployment Instructions

1. **Vercel Deployment**
   - Push to the `main` branch to trigger automatic deployment
   - Monitor deployments at https://vercel.com/dashboard
   - Verify environment variables are set in Vercel settings

2. **Database Setup**
   - Configure Supabase project at https://supabase.com/dashboard
   - Run migrations to set up required tables
   - Ensure Row Level Security (RLS) policies are configured

3. **Environment Configuration**
   - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel
   - Update `.env.example` with required variables
   - Test all environment-dependent features before production

### Feature Roadmap

- [ ] [Core feature 1 implementation]
- [ ] [Core feature 2 implementation]
- [ ] [Authentication enhancements]
- [ ] [Performance optimizations]
- [ ] [Mobile app version]

### Maintenance Guidelines

- **Monitoring**: Check Vercel analytics and Supabase logs regularly
- **Updates**: Keep dependencies current with `npm audit` and security patches
- **Backups**: Configure Supabase automated backups in project settings
- **Performance**: Monitor database query performance and optimize as needed
- **Security**: Review authentication rules and RLS policies quarterly
- **Documentation**: Keep this README updated as features are added