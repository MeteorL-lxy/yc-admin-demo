import { computed, reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import { fetchWalletDashboard, submitWithdraw } from '@/services/wallet.service';
import type { WalletDashboard, WithdrawDraft } from '@/types/wallet';

export function useWalletPage() {
  const { t } = useLocale();
  const dashboard = ref<WalletDashboard | null>(null);
  const loading = ref(false);
  const error = ref('');
  const withdrawVisible = ref(false);
  const submitting = ref(false);
  const withdrawDraft = reactive<WithdrawDraft>({
    amount: 0,
    accountId: ''
  });

  const availableBalance = computed(() => dashboard.value?.summary.availableBalance ?? 0);

  const loadDashboard = async () => {
    loading.value = true;
    error.value = '';

    try {
      dashboard.value = await fetchWalletDashboard();

      if (!withdrawDraft.accountId) {
        withdrawDraft.accountId = dashboard.value.accounts.find((account) => account.isDefault)?.id ?? '';
      }
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : t('wallet.loadError');
    } finally {
      loading.value = false;
    }
  };

  const fillAllAmount = () => {
    withdrawDraft.amount = availableBalance.value;
  };

  const resetWithdrawDraft = () => {
    withdrawDraft.amount = 0;
    withdrawDraft.accountId = dashboard.value?.accounts.find((account) => account.isDefault)?.id ?? '';
  };

  const confirmWithdraw = async () => {
    submitting.value = true;

    try {
      await submitWithdraw({ amount: withdrawDraft.amount, accountId: withdrawDraft.accountId });
      Message.success(t('wallet.confirmWithdraw'));
      withdrawVisible.value = false;
      resetWithdrawDraft();
      await loadDashboard();
    } catch (submitError) {
      Message.error(submitError instanceof Error ? submitError.message : t('wallet.loadError'));
    } finally {
      submitting.value = false;
    }
  };

  return {
    dashboard,
    loading,
    error,
    withdrawVisible,
    submitting,
    withdrawDraft,
    availableBalance,
    loadDashboard,
    fillAllAmount,
    resetWithdrawDraft,
    confirmWithdraw
  };
}
