<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

import type { DonutChartItem } from '@/types/analytics';

const props = defineProps<{
  title: string;
  subtitle?: string;
  items: DonutChartItem[];
  centerLabel: string;
  centerValue: string;
  domId?: string;
}>();

const instance = getCurrentInstance();
const chartDomId = computed(() => props.domId || `main-donut-${instance?.uid ?? '0'}`);
const activeItem = ref<DonutChartItem | null>(null);
let myChart: echarts.EChartsType | null = null;

const seriesData = computed(() =>
  props.items.map((item) => ({
    name: item.label,
    value: item.value,
    itemStyle: {
      color: item.color,
      shadowBlur: 0,
      shadowColor: 'transparent'
    }
  }))
);

function getDefaultActiveItem() {
  return props.items[0] ?? null;
}

function tooltipFormatter(params: unknown) {
  if (Array.isArray(params)) {
    return '';
  }

  const target = params as { name?: string; value?: number | string | null };
  const item = props.items.find((entry) => entry.label === target.name);

  return `<div style="min-width:140px;"><div style="margin-bottom:8px;color:rgba(255,255,255,0.5);font-size:12px;">${target.name ?? ''}</div><div style="font-size:16px;color:#fff;font-weight:600;">${item?.amount ?? target.value ?? 0}</div></div>`;
}

function buildOption(data: Array<{ name: string; value: number; itemStyle: { color: string; shadowBlur: number; shadowColor: string } }>): EChartsOption {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(24, 24, 24, 0.96)',
      borderColor: 'rgba(196, 158, 255, 0.22)',
      borderWidth: 1,
      padding: [10, 12],
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      extraCssText: 'border-radius: 6px; box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);',
      formatter: tooltipFormatter
    },
    series: [
      {
        name: props.title,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderColor: '#181818',
          borderWidth: 2,
          borderRadius: 10
        },
        data
      }
    ]
  };
}

const option = computed<EChartsOption>(() => buildOption(seriesData.value));

function applyOption() {
  if (!myChart) return;
  const nextOption = option.value;
  if (nextOption && typeof nextOption === 'object') {
    myChart.setOption(nextOption);
  }
}

function renderChart() {
  const dom = document.getElementById(chartDomId.value);
  if (!dom) return;

  if (!myChart) {
    myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    activeItem.value = getDefaultActiveItem();

    myChart.on('mouseover', (params) => {
      if (params.componentType !== 'series') return;
      activeItem.value = props.items.find((item) => item.label === params.name) ?? null;
    });

    myChart.on('globalout', () => {
      activeItem.value = getDefaultActiveItem();
    });
  }

  applyOption();
}

function handleResize() {
  myChart?.resize();
}

onMounted(async () => {
  await nextTick();
  renderChart();

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
});

watch(option, () => {
  applyOption();
});

watch(
  () => props.items,
  () => {
    activeItem.value = getDefaultActiveItem();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }

  myChart?.dispose();
  myChart = null;
});
</script>

<template>
  <article class="yc-panel dashboard-donut-card">
    <div class="dashboard-card-header">
      <div>
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="description">{{ subtitle }}</p>
      </div>
    </div>

    <div class="dashboard-donut-card__layout">
      <div class="dashboard-donut-card__chart">
        <div :id="chartDomId" class="dashboard-donut-card__canvas"></div>
        <div class="dashboard-donut-card__summary">
          <strong>{{ activeItem?.amount ?? centerValue }}</strong>
          <span>{{ activeItem?.label ?? centerLabel }}</span>
        </div>
      </div>

      <div class="dashboard-donut-card__legend">
        <div v-for="item in items" :key="item.label" class="dashboard-donut-card__legend-item">
          <span class="dashboard-donut-card__legend-dot" :style="{ background: item.color }"></span>
          <div>
            <strong>{{ item.label }}</strong>
            <p>{{ item.amount }}</p>
          </div>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="less">
.dashboard-donut-card__layout {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dashboard-donut-card__chart {
  position: relative;
  min-height: 282px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background:
    radial-gradient(circle at top, rgba(162, 89, 255, 0.12), transparent 54%),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dashboard-donut-card__canvas {
  width: 100%;
  height: 282px;
}

.dashboard-donut-card__summary {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  pointer-events: none;
}

.dashboard-donut-card__summary strong {
  font-size: 24px;
  line-height: 1.1;
}

.dashboard-donut-card__summary span {
  color: var(--text-secondary);
}

.dashboard-donut-card__legend {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.dashboard-donut-card__legend-item {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 68px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dashboard-donut-card__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.dashboard-donut-card__legend-item strong {
  color: var(--text-title);
}

.dashboard-donut-card__legend-item p {
  margin: 4px 0 0;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .dashboard-donut-card__legend {
    grid-template-columns: 1fr;
  }

  .dashboard-donut-card__summary {
    gap: 8px;
  }
}
</style>
