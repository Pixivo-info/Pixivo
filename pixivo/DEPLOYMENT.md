# 🚀 Pixivo - Deployment Guide

## Environment Variables

Before deploying, make sure to set these environment variables in your deployment platform (Vercel/Netlify):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Supabase Setup

Make sure your Supabase database has the `templates` table with all required fields:
- id, title, description, category, budget, rating, downloads
- image_url, technologies, features, compatible_with
- demo_url, download_url, version, file_size
- status, is_featured, created_at, updated_at

## Production Checklist

- ✅ Build successfully completes
- ✅ All environment variables configured
- ✅ Supabase database setup complete
- ✅ Admin panel working
- ✅ Frontend data fetching working
- ✅ SPA routing configured (vercel.json)

## Performance Notes

- Bundle size warning: Consider code splitting for better performance
- All console logs are development-only
- Production build optimized and ready 