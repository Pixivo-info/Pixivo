-- ========================================
-- FIX RLS POLICIES FOR CUSTOM SOLUTIONS
-- ========================================

-- Step 1: Drop existing policies (if any)
-- =======================================

DROP POLICY IF EXISTS "Public can insert custom solutions" ON custom_solutions;
DROP POLICY IF EXISTS "Users can read own submissions" ON custom_solutions;
DROP POLICY IF EXISTS "Authenticated users can read all custom solutions" ON custom_solutions;
DROP POLICY IF EXISTS "Authenticated users can update custom solutions" ON custom_solutions;
DROP POLICY IF EXISTS "Authenticated users can delete custom solutions" ON custom_solutions;

-- Step 2: Disable RLS temporarily
-- ==============================

ALTER TABLE custom_solutions DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
-- ====================

ALTER TABLE custom_solutions ENABLE ROW LEVEL SECURITY;

-- Step 4: Create correct policies
-- ==============================

-- Policy 1: Allow anyone to INSERT (form submissions)
CREATE POLICY "Allow public inserts" ON custom_solutions
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Allow service role to SELECT all (admin panel)
CREATE POLICY "Allow service role select" ON custom_solutions
  FOR SELECT 
  TO service_role
  USING (true);

-- Policy 3: Allow authenticated users to SELECT all (admin panel)
CREATE POLICY "Allow authenticated select" ON custom_solutions
  FOR SELECT 
  TO authenticated
  USING (true);

-- Policy 4: Allow service role to UPDATE (admin panel)
CREATE POLICY "Allow service role update" ON custom_solutions
  FOR UPDATE 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 5: Allow authenticated users to UPDATE (admin panel)
CREATE POLICY "Allow authenticated update" ON custom_solutions
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 6: Allow service role to DELETE (admin panel)
CREATE POLICY "Allow service role delete" ON custom_solutions
  FOR DELETE 
  TO service_role
  USING (true);

-- Policy 7: Allow authenticated users to DELETE (admin panel)
CREATE POLICY "Allow authenticated delete" ON custom_solutions
  FOR DELETE 
  TO authenticated
  USING (true);

-- Step 5: Verify policies are created
-- ==================================

SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'custom_solutions'
ORDER BY policyname;

-- Step 6: Test INSERT permission
-- =============================

-- This should work now (test with actual data)
INSERT INTO custom_solutions (
  name, 
  email, 
  service, 
  design_type, 
  message, 
  status, 
  priority
) VALUES (
  'Test Policy User',
  'testpolicy@example.com',
  'ui-ux-design',
  'website-design',
  'Testing RLS policies after fix',
  'pending',
  'medium'
);

-- Verify the test insert worked
SELECT id, name, email, service, status, created_at 
FROM custom_solutions 
WHERE email = 'testpolicy@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- Step 7: Clean up test data (optional)
-- ====================================

-- DELETE FROM custom_solutions WHERE email = 'testpolicy@example.com'; 