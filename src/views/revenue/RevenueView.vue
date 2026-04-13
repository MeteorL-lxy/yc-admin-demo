<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconRefresh, IconRight } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import DonutChartCard from '@/components/dashboard/DonutChartCard.vue';
import MetricCard from '@/components/dashboard/MetricCard.vue';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart.vue';
import { useRevenuePage } from './composables/useRevenuePage';

const router = useRouter();
const { t } = useLocale();
const { filters, dashboard, loading, error, loadDashboard, resetFilters } = useRevenuePage();

onMounted(() => {
  void loadDashboard();
});
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('revenue.title')" :subtitle="t('revenue.subtitle')">
      <template #actions>
        <div class="dashboard-heading-actions">
          <div v-if="dashboard" class="dashboard-update-indicator">
            <span></span>
            {{ t('revenue.lastUpdated', { time: dashboard.lastUpdated }) }}
          </div>
          <a-button class="yc-secondary-button" @click="router.push('/revenue-detail')">
            {{ t('revenue.detail') }}
            <IconRight />
          </a-button>
        </div>
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
          <a-button type="primary" class="yc-large-button" @click="loadDashboard">{{ t('common.search') }}</a-button>
          <a-button class="yc-secondary-button yc-secondary-button--large" @click="resetFilters">{{ t('common.reset') }}</a-button>
        </div>
      </div>
    </section>

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('revenue.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('revenue.loadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadDashboard">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <template v-else-if="dashboard">
      <section class="dashboard-metric-grid">
        <MetricCard
          v-for="metric in dashboard.summary"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :helper="metric.note"
          :accent="metric.accent as 'primary' | 'blue' | 'pink'"
        />
      </section>

      <section class="dashboard-grid-three">
        <article class="yc-panel dashboard-chart-panel">
          <div class="dashboard-card-header">
            <div>
              <h3 class="card-title">{{ t('revenue.amountTrend') }}</h3>
              <p class="description">{{ t('revenue.amountTrendDesc') }}</p>
            </div>
          </div>
          <SimpleLineChart
            dom-id="main-revenue-amount"
            :points="dashboard.paymentAmountTrend"
            :primary-legend="t('revenue.amountLegend')"
          />
        </article>

        <article class="yc-panel dashboard-chart-panel">
          <div class="dashboard-card-header">
            <div>
              <h3 class="card-title">{{ t('revenue.payingTrend') }}</h3>
              <p class="description">{{ t('revenue.payingTrendDesc') }}</p>
            </div>
          </div>
          <SimpleLineChart
            dom-id="main-revenue-paying-users"
            :points="dashboard.payingUsersTrend"
            primary-color="#5ad7ff"
            :primary-legend="t('revenue.payingLegend')"
          />
        </article>

        <DonutChartCard
          :title="t('revenue.breakdown')"
          :subtitle="t('revenue.breakdownDesc')"
          :items="dashboard.breakdown"
          :center-label="t('revenue.breakdownCenter')"
          center-value="Mix"
        />
      </section>
    </template>
  </div>
</template>

<style lang="less">
@import './revenue.less';
</style>
