-- ================================
-- PIXIVO CUSTOM SOLUTIONS DATABASE SETUP
-- ================================

-- Step 1: Create Custom Solutions Table
-- =====================================

CREATE TABLE IF NOT EXISTS custom_solutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(100) NOT NULL CHECK (service IN ('ui-ux-design', 'frontend-development')),
  design_type VARCHAR(100) CHECK (design_type IN ('website-design', 'application-design')),
  website_type VARCHAR(100) CHECK (website_type IN ('portfolio', 'e-commerce', 'blog', 'business', 'landing-page', 'educational', 'news', 'social-media')),
  technologies TEXT[], -- Array of selected technologies
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  notes TEXT, -- Admin notes (internal use only)
  assigned_to VARCHAR(255), -- Admin assigned to this request
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_custom_solutions_status ON custom_solutions(status);
CREATE INDEX IF NOT EXISTS idx_custom_solutions_service ON custom_solutions(service);
CREATE INDEX IF NOT EXISTS idx_custom_solutions_priority ON custom_solutions(priority);
CREATE INDEX IF NOT EXISTS idx_custom_solutions_created_at ON custom_solutions(created_at);
CREATE INDEX IF NOT EXISTS idx_custom_solutions_email ON custom_solutions(email);

-- Step 3: Enable Row Level Security (RLS)
-- ======================================

ALTER TABLE custom_solutions ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS Policies
-- ===========================

-- Policy for public to insert (form submissions)
CREATE POLICY "Public can insert custom solutions" ON custom_solutions
  FOR INSERT 
  WITH CHECK (true);

-- Policy for public to read their own submissions (optional)
CREATE POLICY "Users can read own submissions" ON custom_solutions
  FOR SELECT 
  USING (auth.jwt() ->> 'email' = email);

-- Policy for authenticated admin users to read all
CREATE POLICY "Authenticated users can read all custom solutions" ON custom_solutions
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' OR 
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Policy for authenticated admin users to update
CREATE POLICY "Authenticated users can update custom solutions" ON custom_solutions
  FOR UPDATE 
  USING (
    auth.role() = 'authenticated' OR 
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Policy for authenticated admin users to delete
CREATE POLICY "Authenticated users can delete custom solutions" ON custom_solutions
  FOR DELETE 
  USING (
    auth.role() = 'authenticated' OR 
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Step 5: Create trigger for updated_at
-- ====================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_custom_solutions_updated_at
  BEFORE UPDATE ON custom_solutions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Insert Sample Test Data
-- ==============================

INSERT INTO custom_solutions (
  name, 
  email, 
  service, 
  design_type, 
  website_type,
  technologies,
  message, 
  status, 
  priority,
  notes
) VALUES 
-- UI/UX Design Samples
(
  'Raj Patel', 
  'raj.patel@example.com', 
  'ui-ux-design', 
  'website-design', 
  NULL,
  NULL,
  'I need a modern and professional website design for my consulting business. Looking for a clean, corporate look with blue color scheme.', 
  'pending', 
  'high',
  'Client seems serious, follow up within 24 hours'
),
(
  'Priya Shah', 
  'priya.shah@example.com', 
  'ui-ux-design', 
  'application-design', 
  NULL,
  NULL,
  'Mobile app design needed for food delivery service. Need modern UI with easy navigation and attractive food photography layout.', 
  'in-progress', 
  'medium',
  'Design mockups shared with client, waiting for feedback'
),
-- Frontend Development Samples
(
  'Amit Kumar', 
  'amit.kumar@example.com', 
  'frontend-development', 
  NULL,
  'e-commerce',
  ARRAY['react', 'tailwind', 'javascript'],
  'Need a complete e-commerce website with product catalog, shopping cart, payment integration, and admin panel.', 
  'in-progress', 
  'high',
  'Phase 1 completed, working on payment integration'
),
(
  'Sneha Desai', 
  'sneha.desai@example.com', 
  'frontend-development', 
  NULL,
  'portfolio',
  ARRAY['html', 'css', 'javascript'],
  'Personal portfolio website for showcasing my photography work. Need gallery, contact form, and blog section.', 
  'completed', 
  'low',
  'Project delivered successfully, client very happy'
),
(
  'Rohit Mehta', 
  'rohit.mehta@example.com', 
  'frontend-development', 
  NULL,
  'business',
  ARRAY['react', 'typescript', 'tailwind'],
  'Corporate website for our IT company. Need modern design, service pages, team section, and contact forms.', 
  'pending', 
  'medium',
  'Initial consultation scheduled for next week'
),
(
  'Kavya Joshi', 
  'kavya.joshi@example.com', 
  'ui-ux-design', 
  'website-design', 
  NULL,
  NULL,
  'Restaurant website design needed. Should showcase menu, allow online reservations, and have attractive food photos.', 
  'cancelled', 
  'low',
  'Client decided to go with another agency'
),
(
  'Nikhil Pandya', 
  'nikhil.pandya@example.com', 
  'frontend-development', 
  NULL,
  'blog',
  ARRAY['html', 'css', 'javascript', 'bootstrap'],
  'Personal blog website for writing about technology trends. Need clean reading experience and social sharing.', 
  'pending', 
  'low',
  'Waiting for content from client to start development'
),
(
  'Riya Thakkar', 
  'riya.thakkar@example.com', 
  'frontend-development', 
  NULL,
  'landing-page',
  ARRAY['react', 'tailwind'],
  'Landing page for our new mobile app launch. Need conversion-focused design with app download buttons.', 
  'completed', 
  'urgent',
  'Delivered on time for app launch, great conversion rates'
);

-- Step 7: Verify Data
-- ==================

-- Check if table was created successfully
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'custom_solutions' 
ORDER BY ordinal_position;

-- Check sample data
SELECT 
  id,
  name,
  email,
  service,
  status,
  priority,
  created_at
FROM custom_solutions
ORDER BY created_at DESC;

-- Check statistics
SELECT 
  status,
  COUNT(*) as count
FROM custom_solutions
GROUP BY status;

SELECT 
  service,
  COUNT(*) as count
FROM custom_solutions
GROUP BY service;

-- ================================
-- ADDITIONAL HELPFUL QUERIES
-- ================================

-- Get recent requests (last 30 days)
SELECT * FROM custom_solutions 
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Get pending high priority requests
SELECT * FROM custom_solutions 
WHERE status = 'pending' AND priority IN ('high', 'urgent')
ORDER BY priority DESC, created_at ASC;

-- Get requests by service type
SELECT service, COUNT(*) as total,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
FROM custom_solutions
GROUP BY service; 