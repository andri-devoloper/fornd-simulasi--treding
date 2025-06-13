import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import WebHooks from './pages/webhook';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/list-data" element={<WebHooks />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
