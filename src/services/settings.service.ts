import { getLocale, setLocale, translate } from '@/composables/useLocale';
import { settingsMock } from '@/mocks/settings';
import type { AppLanguage, SettingsSnapshot } from '@/types/settings';

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

let settingsSnapshot: SettingsSnapshot = {
  languageOptions: settingsMock.languageOptions.map((option) => ({ ...option })),
  language: getLocale(),
  accountSettings: settingsMock.accountSettings.map((item) => ({ ...item }))
};

const buildLanguageOptions = () => [
  {
    code: 'zh' as const,
    label: translate('settings.languages.zh.label'),
    subtitle: translate('settings.languages.zh.subtitle')
  },
  {
    code: 'en' as const,
    label: translate('settings.languages.en.label'),
    subtitle: translate('settings.languages.en.subtitle')
  }
];

const buildAccountSettings = () =>
  settingsSnapshot.accountSettings.map((item) => {
    const keyMap: Record<string, string> = {
      'ad-monetization': 'adMonetization',
      'premium-preview': 'premiumPreview',
      'auto-payout-report': 'autoPayoutReport'
    };

    const messageKey = keyMap[item.id];

    return {
      ...item,
      title: translate(`settings.accountItems.${messageKey}.title`),
      description: translate(`settings.accountItems.${messageKey}.description`)
    };
  });

const cloneSnapshot = (): SettingsSnapshot => ({
  languageOptions: buildLanguageOptions(),
  language: settingsSnapshot.language,
  accountSettings: buildAccountSettings()
});

export async function fetchSettings(): Promise<SettingsSnapshot> {
  await delay();
  settingsSnapshot.language = getLocale();
  return cloneSnapshot();
}

export async function updateLanguage(language: AppLanguage): Promise<SettingsSnapshot> {
  await delay(180);
  setLocale(language);
  settingsSnapshot = { ...settingsSnapshot, language };
  return cloneSnapshot();
}

export async function updateAccountSetting(settingId: string, enabled: boolean): Promise<SettingsSnapshot> {
  await delay(180);
  settingsSnapshot = {
    ...settingsSnapshot,
    accountSettings: settingsSnapshot.accountSettings.map((item) =>
      item.id === settingId ? { ...item, enabled } : item
    )
  };

  return cloneSnapshot();
}
