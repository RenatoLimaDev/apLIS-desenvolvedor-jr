import { useTranslation } from 'react-i18next';

/**
 * Tabela reutilizável para listagem dos recursos com ações por linha.
 *
 * @param {Object} props
 * @param {Array<{key: string, label: string}>} props.columns
 * @param {Array<Object>} props.rows
 * @param {(row: Object) => void} props.onEdit
 * @param {(row: Object) => void} props.onDelete
 * @param {boolean} props.loading
 */
export default function DataTable({ columns, rows, onEdit, onDelete, loading }) {
  const { t } = useTranslation();

  if (loading) {
    return <p className="py-8 text-center text-gray-500">{t('messages.loading')}</p>;
  }

  if (!rows.length) {
    return <p className="py-8 text-center text-gray-500">{t('messages.empty')}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-4 py-3 text-left font-medium text-gray-600"
              >
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-medium text-gray-600">
              {t('actions.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-gray-800">
                  {row[c.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(row)}
                  className="mr-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  {t('actions.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  {t('actions.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
