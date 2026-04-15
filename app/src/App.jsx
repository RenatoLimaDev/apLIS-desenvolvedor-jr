import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import Medicos from './pages/Medicos.jsx';
import Pacientes from './pages/Pacientes.jsx';

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-8 py-4">
          <LanguageSwitcher />
        </header>
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/medicos" replace />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/pacientes" element={<Pacientes />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
