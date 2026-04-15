import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { medicosService } from '../services/medicos.js';

const emptyForm = { nome: '', CRM: '', UFCRM: '' };

export default function Medicos() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await medicosService.list());
    } catch {
      setError(t('messages.genericError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({ nome: row.nome, CRM: row.CRM, UFCRM: row.UFCRM });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await medicosService.update(editingId, form);
      } else {
        await medicosService.create(form);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError(t('messages.genericError'));
    }
  };

  const handleDelete = async (row) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(t('messages.confirmDelete'))) return;
    try {
      await medicosService.remove(row.id);
      await load();
    } catch {
      setError(t('messages.genericError'));
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: t('medicos.fields.nome') },
    { key: 'CRM', label: t('medicos.fields.crm') },
    { key: 'UFCRM', label: t('medicos.fields.ufcrm') },
  ];

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('medicos.title')}</h1>
        <button
          type="button"
          onClick={openNew}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          + {t('actions.new')}
        </button>
      </header>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <DataTable
        columns={columns}
        rows={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        open={modalOpen}
        title={editingId ? t('medicos.editTitle') : t('medicos.newTitle')}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      >
        <Field
          label={t('medicos.fields.nome')}
          value={form.nome}
          onChange={(v) => setForm({ ...form, nome: v })}
          required
        />
        <Field
          label={t('medicos.fields.crm')}
          value={form.CRM}
          onChange={(v) => setForm({ ...form, CRM: v })}
          required
        />
        <Field
          label={t('medicos.fields.ufcrm')}
          value={form.UFCRM}
          onChange={(v) => setForm({ ...form, UFCRM: v.toUpperCase() })}
          maxLength={2}
          required
        />
      </Modal>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        {...rest}
      />
    </label>
  );
}
