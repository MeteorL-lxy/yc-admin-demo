export type SettingsTab = 'basic' | 'account';
export type AppLanguage = 'en' | 'zh';

export interface LanguageOption {
  code: AppLanguage;
  label: string;
  subtitle: string;
}

export interface AccountSettingItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface SettingsSnapshot {
  languageOptions: LanguageOption[];
  language: AppLanguage;
  accountSettings: AccountSettingItem[];
}
