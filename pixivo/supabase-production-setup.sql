-- ===============================================
-- PIXIVO ADMIN AUTHENTICATION - PRODUCTION SETUP
-- Ready to deploy with custom credentials
-- ===============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================================
-- 1. ADMIN PROFILES TABLE
-- ===============================================

-- Create admin profiles table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(role);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_active ON public.admin_profiles(is_active);

-- ===============================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ===============================================

-- Enable RLS on admin_profiles table
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can view own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin can update own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Super admin can view all profiles" ON public.admin_profiles;

-- Create RLS policies
CREATE POLICY "Admin can view own profile" ON public.admin_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin can update own profile" ON public.admin_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Super admin can view all profiles
CREATE POLICY "Super admin can view all profiles" ON public.admin_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
  );

-- ===============================================
-- 3. TRIGGERS FOR AUTO-UPDATE
-- ===============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS handle_admin_profiles_updated_at ON public.admin_profiles;

-- Create trigger for admin_profiles
CREATE TRIGGER handle_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ===============================================
-- 4. FUNCTIONS FOR ADMIN MANAGEMENT
-- ===============================================

-- Function to create admin profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Pixivo Admin')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();

-- ===============================================
-- 5. CREATE PRODUCTION ADMIN USER
-- ===============================================

-- Create admin user with your credentials
DO $$
DECLARE
    admin_exists boolean := false;
    new_user_id uuid;
BEGIN
    -- Check if admin user already exists
    SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@pixivotheme.com') INTO admin_exists;
    
    -- If admin doesn't exist, create it
    IF NOT admin_exists THEN
        -- Generate new UUID for user
        SELECT gen_random_uuid() INTO new_user_id;
        
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            phone_confirmed_at,
            confirmation_sent_at,
            recovery_sent_at,
            email_change_sent_at,
            created_at,
            updated_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            new_user_id,
            'authenticated',
            'authenticated',
            'admin@pixivotheme.com',
            crypt('pixivo.theme@admin-2003', gen_salt('bf')),
            NOW(),
            NULL,
            NOW(),
            NOW(),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Pixivo Theme Admin"}',
            FALSE,
            '',
            '',
            '',
            ''
        );
        
        RAISE NOTICE 'Production admin user created successfully!';
        RAISE NOTICE 'Email: admin@pixivotheme.com';
        RAISE NOTICE 'Password: pixivo.theme@admin-2003';
    ELSE
        RAISE NOTICE 'Admin user already exists, skipping creation.';
    END IF;
END $$;

-- ===============================================
-- 6. ENABLE AUTHENTICATION
-- ===============================================

-- Ensure auth schema has proper permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT ALL ON auth.users TO authenticated;

-- Grant permissions on public schema
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.admin_profiles TO authenticated;

-- ===============================================
-- 7. VERIFICATION QUERIES
-- ===============================================

-- Verify setup (run these after the above setup)
SELECT 'Admin users count: ' || COUNT(*) FROM auth.users WHERE email = 'admin@pixivotheme.com';
SELECT 'Admin profiles count: ' || COUNT(*) FROM public.admin_profiles WHERE email = 'admin@pixivotheme.com';

-- ===============================================
-- PRODUCTION SETUP COMPLETE! 
-- ===============================================

-- ✅ CREDENTIALS:
-- Email: admin@pixivotheme.com
-- Password: pixivo.theme@admin-2003

-- 📝 NEXT STEPS:
-- 1. This script is ready for production use
-- 2. Make sure your .env file has correct Supabase credentials
-- 3. Test login at: https://your-domain.com/admin/login
-- 4. Enable 2FA on your Supabase dashboard for extra security

-- 🔒 SECURITY REMINDER:
-- - Change password after first login if needed
-- - Enable 2FA on Supabase dashboard
-- - Monitor admin access logs regularly 