import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import { addPaymentAccount, fetchWalletDashboard, setDefaultPaymentAccount } from '@/services/wallet.service';
import type { PaymentAccount, PaymentAccountDraft } from '@/types/wallet';

export function usePaymentManagementPage() {
  const { t } = useLocale();
  const accounts = ref<PaymentAccount[]>([]);
  const loading = ref(false);
  const error = ref('');
  const addVisible = ref(false);
  const submitting = ref(false);

  const loadAccounts = async () => {
    loading.value = true;
    error.value = '';

    try {
      const dashboard = await fetchWalletDashboard();
      accounts.value = dashboard.accounts;
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : t('wallet.loadAccountsError');
    } finally {
      loading.value = false;
    }
  };

  const createAccount = async (draft: PaymentAccountDraft) => {
    submitting.value = true;

    try {
      accounts.value = await addPaymentAccount(draft);
      addVisible.value = false;
      Message.success(t('wallet.saveAccount'));
    } catch (submitError) {
      Message.error(submitError instanceof Error ? submitError.message : t('wallet.loadAccountsError'));
    } finally {
      submitting.value = false;
    }
  };

  const makeDefault = async (accountId: string) => {
    try {
      accounts.value = await setDefaultPaymentAccount(accountId);
      Message.success(t('wallet.setDefault'));
    } catch (submitError) {
      Message.error(submitError instanceof Error ? submitError.message : t('wallet.loadAccountsError'));
    }
  };

  return {
    accounts,
    loading,
    error,
    addVisible,
    submitting,
    loadAccounts,
    createAccount,
    makeDefault
  };
}
