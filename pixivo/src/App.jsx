import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Templates from './pages/Templates/Templates';
import TemplateDetail from './pages/TemplateDetail/TemplateDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/template/:id" element={<TemplateDetail />} />
    </Routes>
  );
}

export default App;
