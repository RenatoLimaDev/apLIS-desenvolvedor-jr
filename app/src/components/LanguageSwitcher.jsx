import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n.js';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span>{t('language.label')}:</span>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="rounded border border-gray-300 bg-white px-2 py-1"
      >
        <option value="pt-BR">{t('language.ptBR')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </label>
  );
}
