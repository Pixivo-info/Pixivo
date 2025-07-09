# 🚀 Pixivo Production Deployment Guide

## 📋 Prerequisites

- Supabase account: https://supabase.com
- Vercel/Netlify account for deployment
- Node.js 18+ installed locally

## 🔧 Setup Instructions

### 1. Supabase Database Setup

1. **Create Supabase Project:**
   - Go to https://supabase.com
   - Create new project
   - Wait for setup to complete

2. **Run SQL Setup:**
   - Open SQL Editor in Supabase Dashboard
   - Copy and paste the entire `supabase-setup.sql` file
   - **IMPORTANT:** Change the default admin credentials in the SQL before running:
     ```sql
     'admin@pixivo.com',                    -- 🔄 Change this email
     crypt('pixivo_admin_2024', gen_salt('bf')),  -- 🔄 Change this password
     ```
   - Execute the SQL script

3. **Get API Keys:**
   - Go to Settings → API
   - Copy these values:
     - Project URL
     - anon/public key
     - service_role key

### 2. Environment Configuration

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your Supabase credentials:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 3. Local Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Test Admin Login:**
   - Go to `http://localhost:5173/admin/login`
   - Use your admin credentials
   - Verify dashboard access

4. **Build production:**
   ```bash
   npm run build
   ```

### 4. Deployment

#### Option A: Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: add supabase authentication"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_SUPABASE_SERVICE_ROLE_KEY`
   - Deploy

#### Option B: Netlify Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository
   - Add environment variables in Netlify settings

### 5. Post-Deployment Setup

1. **Update Supabase Site URL:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your production domain to Site URL
   - Add redirect URLs if needed

2. **Test Production Admin:**
   - Go to `https://your-domain.com/admin/login`
   - Test login with admin credentials
   - Verify all functionality

## 🔒 Security Checklist

- [ ] Changed default admin email and password
- [ ] Environment variables not committed to git
- [ ] Strong admin password (min 12 characters)
- [ ] Supabase RLS policies enabled
- [ ] Production domain added to Supabase URL config
- [ ] 2FA enabled on Supabase dashboard

## 🎯 Admin Panel URLs

- **Development:** `http://localhost:5173/admin/login`
- **Production:** `https://your-domain.com/admin/login`

## 🆘 Troubleshooting

### Authentication Issues
- Check environment variables are correctly set
- Verify Supabase URL configuration
- Check browser console for errors

### Database Issues
- Verify SQL script ran successfully
- Check Supabase database tables exist
- Review RLS policies

### Build Issues
- Clear node_modules and reinstall: `npm ci`
- Check for missing dependencies
- Verify environment variables format

## 📞 Support

For any deployment issues, check:
1. Browser console errors
2. Supabase dashboard logs
3. Deployment platform logs (Vercel/Netlify)

---

✅ **Your Pixivo website is now production-ready with secure Supabase authentication!** 