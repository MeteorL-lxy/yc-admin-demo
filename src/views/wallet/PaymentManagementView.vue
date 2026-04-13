<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconLeft, IconPlus, IconRefresh } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import { usePaymentManagementPage } from './composables/usePaymentManagementPage';
import type { PaymentAccountDraft } from '@/types/wallet';

const router = useRouter();
const { t } = useLocale();
const { accounts, loading, error, addVisible, submitting, loadAccounts, createAccount, makeDefault } =
  usePaymentManagementPage();

const accountDraft = reactive<PaymentAccountDraft>({
  type: 'paypal',
  title: '',
  accountName: '',
  accountNo: '',
  note: ''
});

const resetDraft = () => {
  accountDraft.type = 'paypal';
  accountDraft.title = '';
  accountDraft.accountName = '';
  accountDraft.accountNo = '';
  accountDraft.note = '';
};

const submitAccount = async () => {
  await createAccount({ ...accountDraft });
  resetDraft();
};

onMounted(() => {
  void loadAccounts();
});
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('wallet.paymentManagementTitle')" :subtitle="t('wallet.paymentManagementSubtitle')">
      <template #actions>
        <div class="dashboard-heading-actions">
          <a-button class="yc-secondary-button" @click="router.push('/wallet')">
            <IconLeft />
            {{ t('wallet.backToWallet') }}
          </a-button>
          <a-button type="primary" class="yc-large-button" @click="addVisible = true">
            <IconPlus />
            {{ t('wallet.addAccount') }}
          </a-button>
        </div>
      </template>
    </PageHeading>

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('wallet.loadingAccounts') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('wallet.loadAccountsError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadAccounts">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <section v-else class="payment-card-grid">
      <article v-for="account in accounts" :key="account.id" class="yc-panel payment-card">
        <div class="payment-card__header">
          <div>
            <div class="payment-card__title-row">
              <h3 class="card-title">{{ account.title }}</h3>
              <a-tag v-if="account.isDefault" class="yc-outline-tag">{{ t('wallet.defaultTag') }}</a-tag>
            </div>
            <p class="description">{{ account.note }}</p>
          </div>
        </div>

        <dl class="payment-card__info">
          <div>
            <dt>{{ t('wallet.accountName') }}</dt>
            <dd>{{ account.accountName }}</dd>
          </div>
          <div>
            <dt>{{ t('wallet.accountNo') }}</dt>
            <dd>{{ account.accountNo }}</dd>
          </div>
          <div>
            <dt>{{ t('wallet.accountType') }}</dt>
            <dd>{{ account.type === 'paypal' ? t('wallet.accountTypePaypal') : t('wallet.accountTypeBank') }}</dd>
          </div>
        </dl>

        <a-button
          class="yc-secondary-button"
          :disabled="account.isDefault"
          @click="makeDefault(account.id)"
        >
          {{ t('wallet.setDefault') }}
        </a-button>
      </article>
    </section>

    <a-modal
      v-model:visible="addVisible"
      :title="t('wallet.addAccount')"
      :ok-text="t('wallet.saveAccount')"
      :ok-button-props="{ loading: submitting }"
      modal-class="yc-modal"
      @ok="submitAccount"
      @cancel="resetDraft"
    >
      <div class="wallet-modal">
        <div class="dashboard-field">
          <span>{{ t('wallet.accountType') }}</span>
          <a-select v-model="accountDraft.type">
            <a-option value="paypal">{{ t('wallet.accountTypePaypal') }}</a-option>
            <a-option value="bank">{{ t('wallet.accountTypeBank') }}</a-option>
          </a-select>
        </div>
        <div class="dashboard-field">
          <span>{{ t('wallet.accountTitle') }}</span>
          <a-input v-model="accountDraft.title" :placeholder="t('wallet.titlePlaceholder')" />
        </div>
        <div class="dashboard-field">
          <span>{{ t('wallet.accountName') }}</span>
          <a-input v-model="accountDraft.accountName" :placeholder="t('wallet.namePlaceholder')" />
        </div>
        <div class="dashboard-field">
          <span>{{ t('wallet.accountNo') }}</span>
          <a-input v-model="accountDraft.accountNo" :placeholder="t('wallet.accountNoPlaceholder')" />
        </div>
        <div class="dashboard-field">
          <span>{{ t('wallet.note') }}</span>
          <a-input v-model="accountDraft.note" :placeholder="t('wallet.notePlaceholder')" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang="less">
@import './wallet.less';
</style>
