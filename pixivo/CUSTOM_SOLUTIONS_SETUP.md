# 🚀 Custom Solutions - Supabase Integration Setup

## 📋 **Prerequisites**
- Supabase account aur project setup hona chahiye
- Environment variables configured (.env.local file)

## 🗄️ **Step 1: Supabase Table Setup**

### **SQL Script Run કરો:**
```sql
-- Custom Solutions Table for Pixivo
CREATE TABLE custom_solutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(100) NOT NULL, -- 'ui-ux-design' or 'frontend-development'
  design_type VARCHAR(100), -- Only for UI/UX: 'website-design' or 'application-design'
  website_type VARCHAR(100), -- Only for Frontend: 'portfolio', 'e-commerce', etc.
  technologies TEXT[], -- Array of selected technologies
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in-progress', 'completed', 'cancelled'
  priority VARCHAR(50) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  notes TEXT, -- Admin notes
  assigned_to VARCHAR(255), -- Admin assigned to this request
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE custom_solutions ENABLE ROW LEVEL SECURITY;

-- Policy for public to insert (form submissions)
CREATE POLICY "Public can insert custom solutions" ON custom_solutions
  FOR INSERT WITH CHECK (true);

-- Policy for authenticated users to read (admin panel)
CREATE POLICY "Authenticated users can read custom solutions" ON custom_solutions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for authenticated users to update (admin panel)
CREATE POLICY "Authenticated users can update custom solutions" ON custom_solutions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy for authenticated users to delete (admin panel)
CREATE POLICY "Authenticated users can delete custom solutions" ON custom_solutions
  FOR DELETE USING (auth.role() = 'authenticated');
```

### **Test Data Insert કરો:**
```sql
-- Insert test data
INSERT INTO custom_solutions (name, email, service, design_type, message, status, priority) VALUES
('Raj Patel', 'raj@example.com', 'ui-ux-design', 'website-design', 'I need a modern website design for my business portfolio', 'pending', 'high'),
('Priya Shah', 'priya@example.com', 'frontend-development', NULL, 'Looking for an e-commerce website with React', 'in-progress', 'medium'),
('Amit Kumar', 'amit@example.com', 'ui-ux-design', 'application-design', 'Mobile app design for food delivery service', 'completed', 'low');

-- Update the website_type and technologies for frontend development test data
UPDATE custom_solutions 
SET website_type = 'e-commerce', technologies = ARRAY['react', 'tailwind', 'javascript']
WHERE email = 'priya@example.com';
```

## 🔧 **Step 2: Environment Variables**

### **.env.local file માં add કરો:**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🧪 **Step 3: Testing**

### **1. Form Submission Test (Public)**
1. `npm run dev` کરકે local server start કરો
2. `/custom` page પર જાઓ
3. Form fill કરો:
   - Name: "Test User"
   - Email: "test@example.com"
   - Service: "Frontend Development" select કરો
   - Website Type: "Portfolio Website" select કરો
   - Technologies: "React", "Tailwind CSS" select કરો
   - Message: "This is a test submission"
4. Submit કરો
5. Success message મળવું જોઈએ

### **2. Admin Panel Test**
1. `/admin/login` પર જાઓ
2. Login કરો (admin@pixivo.com / admin123)
3. `/admin/custom-solutions` પર જાઓ
4. આપનું test submission અને sample data દેખાવું જોઈએ
5. Status, Priority change કરકે test કરો
6. "View Details" button click કરો
7. Notes add કરો

### **3. Database Verification**
Supabase dashboard માં જાઓ અને check કરો કે:
- Table properly created છે
- Test data inserted છે
- New submissions આવી રહ્યા છે
- Updates properly working છે

## 📊 **Expected Results**

### **Form Submission:**
- ✅ Form submit થવું જોઈએ
- ✅ Success message અને form reset થવું જોઈએ
- ✅ Data Supabase table માં save થવું જોઈએ

### **Admin Panel:**
- ✅ All submissions visible થવા જોઈએ
- ✅ Filter કામ કરવું જોઈએ
- ✅ Status/Priority updates કામ કરવા જોઈએ
- ✅ Statistics properly calculated થવા જોઈએ

## 🐛 **Troubleshooting**

### **Form Submission Issues:**
```bash
# Console માં check કરો
- Network errors (environment variables wrong?)
- CORS errors (RLS policies issue?)
- Validation errors (required fields missing?)
```

### **Admin Panel Issues:**
```bash
# Check if:
- Service role key configured છે?
- Admin authentication working છે?
- Table permissions correct છે?
```

### **Common Error Solutions:**
1. **"Table doesn't exist"**: SQL script properly run કર્યું છે?
2. **"Permission denied"**: RLS policies correctly setup છે?
3. **"Environment variable missing"**: .env.local file માં all variables છે?

## 🔄 **Data Flow**

```
User fills form → submitCustomSolutionRequest() → Supabase Insert → 
Admin Panel → getAllCustomSolutions() → Display in table
```

## 📈 **Production Deployment**

### **Vercel માટે:**
1. Environment variables Vercel dashboard માં add કરો
2. Build ને deploy કરો
3. Production database માં SQL script run કરો

### **Security Checklist:**
- ✅ RLS enabled છે
- ✅ Public can only INSERT
- ✅ Admin requires authentication
- ✅ Service role key secure છે

## 🎯 **Success Criteria**

આ integration successful છે જ્યારે:
1. ✅ Users form submit કરી શકે
2. ✅ Data database માં save થાય
3. ✅ Admin panel માં show થાય
4. ✅ Admin status/priority update કરી શકે
5. ✅ Statistics properly calculated થાય

## 📞 **Next Steps**

1. **Email Notifications**: Form submission પર client ને email મોકલવું
2. **File Uploads**: Design references upload કરવાની facility
3. **Advanced Filtering**: Date ranges, assignee filters
4. **Automated Responses**: Status change પર automatic emails 