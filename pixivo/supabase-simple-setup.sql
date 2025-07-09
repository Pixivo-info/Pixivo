-- ===============================================
-- PIXIVO ADMIN AUTHENTICATION - SIMPLE SETUP
-- Safer approach using Supabase built-in features
-- ===============================================

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

-- Create trigger for admin_profiles
CREATE TRIGGER handle_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ===============================================
-- 4. AUTO-CREATE PROFILE FUNCTION
-- ===============================================

-- Function to create admin profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User')
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
-- 5. GRANT PERMISSIONS
-- ===============================================

-- Grant permissions on public schema
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON public.admin_profiles TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ===============================================
-- SETUP COMPLETE! 
-- ===============================================

-- 📝 NEXT STEPS:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add user" manually:
--    - Email: admin@pixivo.com (or your email)
--    - Password: your-strong-password
--    - Check "Email confirm"
-- 3. The admin_profiles entry will be created automatically
-- 4. Test login in your application

-- 🔒 SECURITY NOTES:
-- - Create admin users through Supabase Dashboard UI (safer)
-- - Use strong passwords (min 12 characters)
-- - Enable 2FA on your Supabase dashboard
-- - Regularly monitor admin access logs

-- ===============================================
-- VERIFICATION QUERIES (run after creating admin user)
-- ===============================================

-- Check admin users
-- SELECT email, role, is_active, created_at FROM public.admin_profiles;

-- Check auth users  
-- SELECT email, email_confirmed_at, created_at FROM auth.users; 