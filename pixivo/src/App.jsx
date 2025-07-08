import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Templates from './pages/Templates/Templates';
import TemplateDetail from './pages/TemplateDetail/TemplateDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import CustomSolutions from './pages/CustomSolutions/CustomSolutions';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import License from './pages/License/License';
import Refund from './pages/Refund/Refund';

// Admin imports
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import TemplateManagement from './admin/pages/TemplateManagement';
import TemplateEditor from './admin/pages/TemplateEditor';
import CustomSolutionsManagement from './admin/pages/CustomSolutionsManagement';
import AdminLogin from './admin/pages/AdminLogin';
import ProtectedRoute from './admin/components/ProtectedRoute';
import { AuthProvider } from './admin/contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template/:id" element={<TemplateDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/custom" element={<CustomSolutions />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/license" element={<License />} />
        <Route path="/refund" element={<Refund />} />
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="templates" element={<TemplateManagement />} />
          <Route path="templates/new" element={<TemplateEditor />} />
          <Route path="templates/edit/:id" element={<TemplateEditor />} />
          <Route path="custom-solutions" element={<CustomSolutionsManagement />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
