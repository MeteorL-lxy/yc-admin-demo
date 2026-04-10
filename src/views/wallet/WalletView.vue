<script setup lang="ts">
import { computed, h, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconRefresh, IconSafe, IconStorage } from '@arco-design/web-vue/es/icon';
import type { TableColumnData } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import { useWalletPage } from './composables/useWalletPage';
import type { WithdrawRecord } from '@/types/wallet';

const router = useRouter();
const { t } = useLocale();
const {
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
} = useWalletPage();

const columns = computed<TableColumnData[]>(() => [
  {
    title: t('wallet.columns.status'),
    dataIndex: 'status',
    render: ({ record }: { record: WithdrawRecord }) =>
      h(
        'span',
        {
          class: ['status-pill', `status-pill--${record.status}`]
        },
        t(`wallet.status.${record.status}`)
      )
  },
  {
    title: t('wallet.columns.applyAmount'),
    dataIndex: 'applyAmount',
    render: ({ record }: { record: WithdrawRecord }) => `$${record.applyAmount.toFixed(2)}`
  },
  {
    title: t('wallet.columns.actualAmount'),
    dataIndex: 'actualAmount',
    render: ({ record }: { record: WithdrawRecord }) => `$${record.actualAmount.toFixed(2)}`
  },
  { title: t('wallet.columns.account'), dataIndex: 'accountLabel' },
  { title: t('wallet.columns.createdAt'), dataIndex: 'createdAt' }
]);

const canSubmit = computed(
  () => withdrawDraft.amount > 0 && withdrawDraft.amount <= availableBalance.value && !!withdrawDraft.accountId
);

onMounted(() => {
  void loadDashboard();
});

const openWithdraw = () => {
  withdrawVisible.value = true;
  if (!withdrawDraft.accountId && dashboard.value) {
    withdrawDraft.accountId = dashboard.value.accounts.find((account) => account.isDefault)?.id ?? '';
  }
};

const closeWithdraw = () => {
  withdrawVisible.value = false;
  resetWithdrawDraft();
};
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('wallet.title')" :subtitle="t('wallet.subtitle')" />

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('wallet.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('wallet.loadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadDashboard">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <template v-else-if="dashboard">
      <section class="wallet-grid">
        <article class="wallet-balance-card">
          <div class="wallet-balance-card__copy">
            <p class="wallet-balance-card__eyebrow">{{ t('wallet.available') }}</p>
            <strong>${{ dashboard.summary.availableBalance.toFixed(2) }}</strong>
            <p>{{ t('wallet.availableDesc') }}</p>
          </div>

          <a-button type="primary" class="yc-large-button" @click="openWithdraw">
            <IconStorage />
            {{ t('wallet.withdrawNow') }}
          </a-button>

          <div class="wallet-summary-grid">
            <div>
              <span>{{ t('wallet.withdrawing') }}</span>
              <strong>${{ dashboard.summary.withdrawingAmount.toFixed(2) }}</strong>
            </div>
            <div>
              <span>{{ t('wallet.pending') }}</span>
              <strong>${{ dashboard.summary.pendingAmount.toFixed(2) }}</strong>
            </div>
            <div>
              <span>{{ t('wallet.totalWithdraw') }}</span>
              <strong>${{ dashboard.summary.totalWithdraw.toFixed(2) }}</strong>
            </div>
          </div>
        </article>

        <article class="yc-panel wallet-quick-card">
          <div class="dashboard-card-header">
            <div>
              <h3 class="card-title">{{ t('wallet.quickActions') }}</h3>
              <p class="description">{{ t('wallet.quickActionsDesc') }}</p>
            </div>
          </div>

          <div class="wallet-quick-card__body">
            <div class="wallet-quick-card__badge">
              <IconSafe />
            </div>
            <div>
              <h4>{{ t('wallet.paymentManagement') }}</h4>
              <p>{{ t('wallet.paymentManagementDesc') }}</p>
            </div>
          </div>

          <a-button class="yc-secondary-button" @click="router.push('/payment-management')">
            {{ t('wallet.openPaymentManagement') }}
          </a-button>
        </article>
      </section>

      <article class="yc-panel detail-table-shell">
        <div class="dashboard-card-header">
          <div>
            <h3 class="card-title">{{ t('wallet.records') }}</h3>
            <p class="description">{{ t('wallet.recordsDesc') }}</p>
          </div>
        </div>
        <a-table :columns="columns" :data="dashboard.records" :pagination="false" stripe />
      </article>
    </template>

    <a-modal
      v-model:visible="withdrawVisible"
      :title="t('wallet.withdrawModalTitle')"
      :ok-text="t('wallet.confirmWithdraw')"
      :ok-button-props="{ disabled: !canSubmit, loading: submitting }"
      modal-class="yc-modal"
      @ok="confirmWithdraw"
      @cancel="closeWithdraw"
    >
      <div class="wallet-modal">
        <div class="dashboard-field">
          <span>{{ t('wallet.amount') }}</span>
          <div class="wallet-modal__amount-row">
            <a-input-number v-model="withdrawDraft.amount" :min="0" :precision="2" class="wallet-modal__amount-input" />
            <a-button class="yc-small-button" @click="fillAllAmount">{{ t('wallet.withdrawAll') }}</a-button>
          </div>
        </div>

        <p class="description">{{ t('wallet.availableBalance', { amount: `$${availableBalance.toFixed(2)}` }) }}</p>

        <div class="dashboard-field">
          <span>{{ t('wallet.paymentAccount') }}</span>
          <a-select v-model="withdrawDraft.accountId" :placeholder="t('wallet.paymentAccountPlaceholder')">
            <a-option v-for="account in dashboard?.accounts ?? []" :key="account.id" :value="account.id">
              {{ account.title }} · {{ account.accountNo }}
            </a-option>
          </a-select>
        </div>

        <div class="wallet-modal__notice">
          {{ t('wallet.withdrawNotice') }}
        </div>
      </div>
    </a-modal>
  </div>
</template>
