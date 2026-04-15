import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors',
      isActive
        ? 'bg-purple-600 text-white'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white',
    ].join(' ');

  return (
    <aside className="w-60 shrink-0 bg-gray-900 text-white h-full flex flex-col">
      <div className="px-6 py-5 border-b border-gray-800">
        <h1 className="text-xl font-semibold">{t('app.title')}</h1>
      </div>
      <nav className="flex-1 p-3 space-y-1" aria-label="Main navigation">
        <NavLink to="/medicos" className={linkClass}>
          {t('sidebar.medicos')}
        </NavLink>
        <NavLink to="/pacientes" className={linkClass}>
          {t('sidebar.pacientes')}
        </NavLink>
      </nav>
    </aside>
  );
}
