<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { init, use, type EChartsType } from 'echarts/core';

import type { DonutChartItem } from '@/types/analytics';

use([PieChart, TooltipComponent, CanvasRenderer]);

const props = defineProps<{
  title: string;
  subtitle?: string;
  items: DonutChartItem[];
  centerLabel: string;
  centerValue: string;
}>();

const chartRef = ref<HTMLDivElement | null>(null);
const activeItem = ref<DonutChartItem | null>(null);
let chart: EChartsType | null = null;
let resizeObserver: ResizeObserver | null = null;

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

function renderChart() {
  if (!chartRef.value) return;

  if (!chart) {
    chart = init(chartRef.value, undefined, { renderer: 'canvas' });
    activeItem.value = getDefaultActiveItem();

    chart.on('mouseover', (params) => {
      if (params.componentType !== 'series') return;
      activeItem.value = props.items.find((item) => item.label === params.name) ?? null;
    });

    chart.on('globalout', () => {
      activeItem.value = getDefaultActiveItem();
    });
  }

  chart.setOption(option.value, true);
  chart.resize();
}

function handleResize() {
  chart?.resize();
}

onMounted(async () => {
  await nextTick();
  renderChart();

  if (typeof ResizeObserver !== 'undefined' && chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(chartRef.value);
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
});

watch(option, () => {
  renderChart();
});

watch(
  () => props.items,
  () => {
    activeItem.value = getDefaultActiveItem();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }

  chart?.dispose();
  chart = null;
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
        <div ref="chartRef" class="dashboard-donut-card__canvas"></div>
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
