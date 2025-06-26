import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Templates from './pages/Templates/Templates';
import TemplateDetail from './pages/TemplateDetail/TemplateDetail';
import About from './pages/About/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/template/:id" element={<TemplateDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
