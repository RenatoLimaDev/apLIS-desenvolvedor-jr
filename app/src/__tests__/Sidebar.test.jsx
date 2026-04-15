import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n.js';
import Sidebar from '../components/Sidebar.jsx';

function renderSidebar() {
  return render(
    <MemoryRouter initialEntries={['/medicos']}>
      <Sidebar />
    </MemoryRouter>
  );
}

describe('<Sidebar />', () => {
  it('renderiza os links de Médicos e Pacientes em pt-BR', async () => {
    await i18n.changeLanguage('pt-BR');
    renderSidebar();

    expect(screen.getByRole('link', { name: 'Médicos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pacientes' })).toBeInTheDocument();
  });

  it('traduz os links quando o idioma muda para en', async () => {
    await i18n.changeLanguage('en');
    renderSidebar();

    expect(screen.getByRole('link', { name: 'Doctors' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Patients' })).toBeInTheDocument();
  });
});
