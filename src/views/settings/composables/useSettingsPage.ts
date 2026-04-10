import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import { fetchSettings, updateAccountSetting, updateLanguage } from '@/services/settings.service';
import type { AppLanguage, SettingsSnapshot, SettingsTab } from '@/types/settings';

export function useSettingsPage() {
  const { t } = useLocale();
  const snapshot = ref<SettingsSnapshot | null>(null);
  const loading = ref(false);
  const error = ref('');
  const activeTab = ref<SettingsTab>('basic');

  const loadSettings = async () => {
    loading.value = true;
    error.value = '';

    try {
      snapshot.value = await fetchSettings();
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : t('settings.loadError');
    } finally {
      loading.value = false;
    }
  };

  const changeLanguage = async (language: AppLanguage) => {
    try {
      snapshot.value = await updateLanguage(language);
      Message.success(t('settings.languageUpdated'));
    } catch (updateError) {
      Message.error(updateError instanceof Error ? updateError.message : t('settings.loadError'));
    }
  };

  const toggleAccountSetting = async (settingId: string, enabled: boolean) => {
    try {
      snapshot.value = await updateAccountSetting(settingId, enabled);
      Message.success(t('settings.accountUpdated'));
    } catch (updateError) {
      Message.error(updateError instanceof Error ? updateError.message : t('settings.loadError'));
    }
  };

  return {
    snapshot,
    loading,
    error,
    activeTab,
    loadSettings,
    changeLanguage,
    toggleAccountSetting
  };
}
