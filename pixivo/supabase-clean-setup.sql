-- ===============================================
-- PIXIVO ADMIN AUTHENTICATION - CLEAN SETUP
-- This script safely handles existing objects
-- ===============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================================
-- 1. CLEAN EXISTING SETUP (IF ANY)
-- ===============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can view own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin can update own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Super admin can view all profiles" ON public.admin_profiles;

-- Drop existing triggers
DROP TRIGGER IF EXISTS handle_admin_profiles_updated_at ON public.admin_profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP FUNCTION IF EXISTS public.handle_new_admin();

-- ===============================================
-- 2. CREATE ADMIN PROFILES TABLE
-- ===============================================

-- Drop and recreate table for fresh start
DROP TABLE IF EXISTS public.admin_profiles CASCADE;

-- Create admin profiles table
CREATE TABLE public.admin_profiles (
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
CREATE INDEX idx_admin_profiles_email ON public.admin_profiles(email);
CREATE INDEX idx_admin_profiles_role ON public.admin_profiles(role);
CREATE INDEX idx_admin_profiles_active ON public.admin_profiles(is_active);

-- ===============================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ===============================================

-- Enable RLS on admin_profiles table
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

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
-- 4. FUNCTIONS AND TRIGGERS
-- ===============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for admin_profiles
CREATE TRIGGER handle_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

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

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();

-- ===============================================
-- 5. CREATE ADMIN USER
-- ===============================================

-- Delete existing admin user if exists
DELETE FROM auth.users WHERE email = 'admin@pixivotheme.com';

-- Create fresh admin user
DO $$
DECLARE
    new_user_id uuid;
BEGIN
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
    
    RAISE NOTICE '✅ Fresh admin user created successfully!';
    RAISE NOTICE '📧 Email: admin@pixivotheme.com';
    RAISE NOTICE '🔑 Password: pixivo.theme@admin-2003';
END $$;

-- ===============================================
-- 6. GRANT PERMISSIONS
-- ===============================================

-- Grant permissions on public schema
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON public.admin_profiles TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ===============================================
-- 7. VERIFICATION
-- ===============================================

-- Verify setup
SELECT 
  '✅ Admin user created: ' || email as status,
  'Confirmed: ' || CASE WHEN email_confirmed_at IS NOT NULL THEN 'Yes' ELSE 'No' END as confirmed
FROM auth.users 
WHERE email = 'admin@pixivotheme.com';

SELECT 
  '✅ Admin profile created: ' || email as status,
  'Role: ' || role as role_info
FROM public.admin_profiles 
WHERE email = 'admin@pixivotheme.com';

-- ===============================================
-- 🎉 CLEAN SETUP COMPLETE!
-- ===============================================

-- ✅ CREDENTIALS:
-- Email: admin@pixivotheme.com
-- Password: pixivo.theme@admin-2003

-- 📝 READY FOR PRODUCTION:
-- 1. All existing conflicts resolved
-- 2. Fresh admin user created
-- 3. Test login at: https://your-domain.com/admin/login 