import { useTranslation } from 'react-i18next';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES: Array<{ key: string; label: string }> = [
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
];

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();

  const handleValueChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div>
      <Label htmlFor="language-trigger">{t('language')}</Label>
      <Select value={i18n.language} onValueChange={handleValueChange}>
        <SelectTrigger id="language-trigger" className="mt-1">
          <SelectValue placeholder={LANGUAGES.find(({ key }) => key === i18n.language)?.label || '...'} />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map(({ key, label }) => (
            <SelectItem key={`lang-opt-${key}`} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelection;
