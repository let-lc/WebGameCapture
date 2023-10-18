import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SelectTheme = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Label htmlFor="theme-trigger">{t('theme')}</Label>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger id="theme-trigger" className="mt-1">
          {/* @ts-ignore */}
          <SelectValue placeholder={theme && t(`themes.${theme}`)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">{t('themes.light')}</SelectItem>
          <SelectItem value="dark">{t('themes.dark')}</SelectItem>
          <SelectItem value="system">{t('themes.system')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTheme;
