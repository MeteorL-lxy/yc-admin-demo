<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconLeft, IconRefresh } from '@arco-design/web-vue/es/icon';
import type { TableColumnData } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import { useRevenueDetailPage } from './composables/useRevenueDetailPage';

const router = useRouter();
const { t } = useLocale();
const { filters, rows, loading, error, loadRows, resetFilters } = useRevenueDetailPage();

const columns = computed<TableColumnData[]>(() => [
  { title: t('revenue.columns.date'), dataIndex: 'date' },
  { title: t('revenue.columns.work'), dataIndex: 'workName' },
  { title: t('revenue.columns.type'), dataIndex: 'workType' },
  { title: t('revenue.columns.audience'), dataIndex: 'audienceType' },
  { title: t('revenue.columns.revenue'), dataIndex: 'amount' },
  { title: t('revenue.columns.paidUsers'), dataIndex: 'paidUsers' },
  { title: t('revenue.columns.freeUsers'), dataIndex: 'freeUsers' },
  { title: t('revenue.columns.orders'), dataIndex: 'orderCount' }
]);

onMounted(() => {
  void loadRows();
});
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('revenue.detailTitle')" :subtitle="t('revenue.detailSubtitle')">
      <template #actions>
        <a-button class="yc-secondary-button" @click="router.push('/revenue')">
          <IconLeft />
          {{ t('revenue.backToRevenue') }}
        </a-button>
      </template>
    </PageHeading>

    <section class="yc-panel dashboard-filter-panel">
      <div class="dashboard-filter-grid">
        <div class="dashboard-field">
          <span>{{ t('revenue.startDate') }}</span>
          <a-date-picker
            v-model="filters.startDate"
            class="dashboard-picker"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            :allow-clear="false"
          />
        </div>
        <div class="dashboard-field">
          <span>{{ t('revenue.endDate') }}</span>
          <a-date-picker
            v-model="filters.endDate"
            class="dashboard-picker"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            :allow-clear="false"
          />
        </div>
        <div class="dashboard-field">
          <span>{{ t('revenue.audienceType') }}</span>
          <a-select v-model="filters.audienceType">
            <a-option value="all">{{ t('revenue.allAudience') }}</a-option>
            <a-option value="follower">{{ t('revenue.follower') }}</a-option>
            <a-option value="non_follower">{{ t('revenue.nonFollower') }}</a-option>
          </a-select>
        </div>
        <div class="dashboard-field">
          <span>{{ t('revenue.workName') }}</span>
          <a-input v-model="filters.keyword" allow-clear :placeholder="t('revenue.workName')" />
        </div>
        <div class="dashboard-field">
          <span>{{ t('revenue.workType') }}</span>
          <a-select v-model="filters.workType">
            <a-option value="all">{{ t('revenue.allTypes') }}</a-option>
            <a-option value="novel">{{ t('revenue.novel') }}</a-option>
            <a-option value="drama">{{ t('revenue.drama') }}</a-option>
          </a-select>
        </div>
        <div class="dashboard-filter-actions">
          <a-button type="primary" class="yc-large-button" @click="loadRows">{{ t('common.search') }}</a-button>
          <a-button class="yc-secondary-button yc-secondary-button--large" @click="resetFilters">{{ t('common.reset') }}</a-button>
        </div>
      </div>
    </section>

    <div v-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('revenue.detailLoadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadRows">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <article v-else class="yc-panel detail-table-shell">
      <a-table
        :columns="columns"
        :data="rows"
        :loading="loading"
        :pagination="{ pageSize: 8 }"
        stripe
      />
    </article>
  </div>
</template>
