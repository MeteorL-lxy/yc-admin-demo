<script setup lang="ts">
import { onMounted } from 'vue';
import { IconBulb, IconRefresh } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import DonutChartCard from '@/components/dashboard/DonutChartCard.vue';
import HeatmapCard from '@/components/dashboard/HeatmapCard.vue';
import MetricCard from '@/components/dashboard/MetricCard.vue';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart.vue';
import { useAnalyticsPage } from './composables/useAnalyticsPage';

const { t } = useLocale();
const {
  dashboard,
  loading,
  error,
  activeRange,
  activeWork,
  activeTab,
  diagnosisVisible,
  diagnosisLoading,
  diagnosisResult,
  loadDashboard,
  openDiagnosis
} = useAnalyticsPage();

onMounted(() => {
  void loadDashboard();
});

const rangeOptions = [
  { key: 'analytics.range7d', value: '7d' },
  { key: 'analytics.range28d', value: '28d' },
  { key: 'analytics.range90d', value: '90d' }
] as const;
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('analytics.title')" :subtitle="t('analytics.subtitle')">
      <template #actions>
        <div class="dashboard-toolbar">
          <div class="dashboard-range-group">
            <button
              v-for="option in rangeOptions"
              :key="option.value"
              type="button"
              class="dashboard-range-button"
              :class="{ 'dashboard-range-button--active': activeRange === option.value }"
              @click="activeRange = option.value"
            >
              {{ t(option.key) }}
            </button>
          </div>

          <a-select v-model="activeWork" class="dashboard-select" :placeholder="t('analytics.selectWork')">
            <a-option
              v-for="option in dashboard?.workOptions ?? []"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-option>
          </a-select>
        </div>
      </template>
    </PageHeading>

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('analytics.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('analytics.loadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadDashboard">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <template v-else-if="dashboard">
      <section class="analytics-hero-card">
        <div>
          <p class="analytics-hero-card__eyebrow">{{ t('analytics.aiEyebrow') }}</p>
          <h2>{{ dashboard.insight.title }}</h2>
          <p>{{ dashboard.insight.summary }}</p>
          <div class="analytics-hero-card__tags">
            <a-tag v-for="tag in dashboard.insight.tags" :key="tag" class="yc-tag">{{ tag }}</a-tag>
          </div>
        </div>

        <a-button type="primary" class="yc-large-button" @click="openDiagnosis">
          <IconBulb />
          {{ t('analytics.startAnalysis') }}
        </a-button>
      </section>

      <a-tabs v-model:active-key="activeTab" class="dashboard-tabs">
        <a-tab-pane key="overview" :title="t('analytics.overview')">
          <div class="dashboard-stack">
            <section class="dashboard-metric-grid">
              <MetricCard
                v-for="metric in dashboard.metrics"
                :key="metric.label"
                :label="metric.label"
                :value="metric.value"
                :helper="metric.helper"
                :change="metric.change"
                :trend="metric.trend"
              />
            </section>

            <section class="dashboard-grid-two">
              <article class="yc-panel dashboard-chart-panel">
                <div class="dashboard-card-header">
                  <div>
                    <h3 class="card-title">{{ t('analytics.siteTraffic') }}</h3>
                    <p class="description">{{ t('analytics.siteTrafficDesc') }}</p>
                  </div>
                </div>
                <SimpleLineChart
                  dom-id="main-analytics-site-traffic"
                  :points="dashboard.siteTraffic"
                  :primary-legend="t('analytics.viewsLegend')"
                  :secondary-legend="t('analytics.visitorsLegend')"
                />
              </article>

              <DonutChartCard
                :title="t('analytics.workContribution')"
                :subtitle="t('analytics.workContributionDesc')"
                :items="dashboard.workContribution"
                :center-label="t('analytics.workContributionCenter')"
                center-value="100%"
              />
            </section>
          </div>
        </a-tab-pane>

        <a-tab-pane key="audience" :title="t('analytics.audience')">
          <div class="dashboard-stack">
            <section class="dashboard-grid-two">
              <HeatmapCard
                :title="t('analytics.audienceHeatmap')"
                :subtitle="t('analytics.audienceHeatmapDesc')"
                :cells="dashboard.audienceHeatmap"
              />

              <DonutChartCard
                :title="t('analytics.fanLoyalty')"
                :subtitle="t('analytics.fanLoyaltyDesc')"
                :items="dashboard.fanLoyalty"
                :center-label="t('analytics.fanLoyaltyCenter')"
                center-value="Core"
              />
            </section>

            <section class="dashboard-grid-two dashboard-grid-two--stacked">
              <article class="yc-panel">
                <div class="dashboard-card-header">
                  <div>
                    <h3 class="card-title">{{ t('analytics.recentActivity') }}</h3>
                    <p class="description">{{ t('analytics.recentActivityDesc') }}</p>
                  </div>
                </div>

                <a-empty v-if="dashboard.recentActivity.length === 0" :description="t('analytics.recentActivityEmpty')" />

                <div v-else class="dashboard-activity-list">
                  <article v-for="item in dashboard.recentActivity" :key="item.id" class="dashboard-activity-item">
                    <div>
                      <strong>{{ item.reader }}</strong>
                      <p>{{ item.workName }} · {{ item.chapter }}</p>
                    </div>
                    <div class="dashboard-activity-item__meta">
                      <span>{{ item.duration }}</span>
                      <span>{{ item.happenedAt }}</span>
                    </div>
                  </article>
                </div>
              </article>

              <article class="yc-panel dashboard-insight-panel">
                <div class="dashboard-card-header">
                  <div>
                    <h3 class="card-title">{{ t('analytics.metricsAndSuggestions') }}</h3>
                    <p class="description">{{ t('analytics.metricsAndSuggestionsDesc') }}</p>
                  </div>
                </div>

                <div class="dashboard-kpi-list">
                  <div v-for="item in dashboard.audienceMetrics" :key="item.label" class="dashboard-kpi-item">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                    <p>{{ item.note }}</p>
                  </div>
                </div>

                <ul class="dashboard-suggestion-list">
                  <li v-for="suggestion in dashboard.suggestions" :key="suggestion">{{ suggestion }}</li>
                </ul>
              </article>
            </section>
          </div>
        </a-tab-pane>
      </a-tabs>
    </template>

    <a-modal
      v-model:visible="diagnosisVisible"
      :title="t('analytics.aiTitle')"
      hide-cancel
      :ok-text="t('common.close')"
      class="dashboard-modal"
      modal-class="yc-modal"
    >
      <div v-if="diagnosisLoading" class="dashboard-modal__loading">
        <a-spin />
        <p class="description">{{ t('common.loading') }}</p>
      </div>
      <div v-else class="dashboard-modal__body">
        <p class="body-text">{{ t('analytics.aiModalDesc') }}</p>
        <ul class="dashboard-suggestion-list">
          <li v-for="entry in diagnosisResult" :key="entry">{{ entry }}</li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>

<style lang="less">
@import './analytics.less';
</style>
