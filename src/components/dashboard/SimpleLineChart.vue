<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { init, use, type EChartsType } from 'echarts/core';

import type { TrendPoint } from '@/types/analytics';

use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

const props = withDefaults(
  defineProps<{
    points: TrendPoint[];
    primaryColor?: string;
    secondaryColor?: string;
    primaryLegend?: string;
    secondaryLegend?: string;
  }>(),
  {
    primaryColor: '#a259ff',
    secondaryColor: '#5ad7ff',
    primaryLegend: '',
    secondaryLegend: ''
  }
);

const chartRef = ref<HTMLDivElement | null>(null);
let chart: EChartsType | null = null;
let resizeObserver: ResizeObserver | null = null;

const labels = computed(() => props.points.map((point) => point.label));
const mainValues = computed(() => props.points.map((point) => point.value));
const secondaryValues = computed(() => props.points.map((point) => point.secondaryValue ?? null));
const hasSecondary = computed(() => props.points.some((point) => typeof point.secondaryValue === 'number'));

function toRgba(color: string, alpha: number) {
  const hex = color.replace('#', '');
  const normalized = hex.length === 3 ? hex.split('').map((char) => `${char}${char}`).join('') : hex;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function tooltipFormatter(params: unknown) {
  if (!Array.isArray(params)) {
    return '';
  }

  const [first] = params as Array<{ axisValueLabel?: string }>;
  const title = first?.axisValueLabel ?? '';

  const rows = (params as Array<{ seriesName?: string; color?: string; value?: number | string | null }>)
    .map((item) => {
      const markerColor = String(item.color ?? props.primaryColor);
      const marker = `<span style="display:inline-block;width:8px;height:8px;margin-right:8px;border-radius:999px;background:${markerColor};box-shadow:0 0 10px ${toRgba(markerColor, 0.35)};"></span>`;

      return `${marker}${item.seriesName ?? ''}<span style="float:right;margin-left:18px;color:#fff;font-weight:600;">${item.value ?? '-'}</span>`;
    })
    .join('<br/>');

  return `<div style="min-width:156px;"><div style="margin-bottom:8px;color:rgba(255,255,255,0.5);font-size:12px;">${title}</div>${rows}</div>`;
}

function buildSeries(name: string, color: string, data: Array<number | null>, isSecondary = false) {
  const lineType: 'solid' | 'dashed' = isSecondary ? 'dashed' : 'solid';
  const easing = 'cubicOut' as const;

  return {
    name,
    type: 'line' as const,
    data,
    smooth: false,
    symbol: 'circle',
    showSymbol: true,
    symbolSize: isSecondary ? 7 : 8,
    connectNulls: false,
    lineStyle: {
      width: isSecondary ? 2 : 3,
      color,
      type: lineType,
      opacity: isSecondary ? 0.92 : 1
    },
    itemStyle: {
      color,
      borderColor: '#181818',
      borderWidth: 2
    },
    emphasis: {
      focus: 'series' as const,
      scale: true,
      itemStyle: {
        color,
        borderColor: '#ffffff',
        borderWidth: 2,
        shadowBlur: 12,
        shadowColor: toRgba(color, 0.32)
      }
    },
    animationDuration: 1800,
    animationDurationUpdate: 700,
    animationEasing: easing,
    animationEasingUpdate: easing
  };
}

function buildOption(mainData: number[], secondaryData: Array<number | null>): EChartsOption {
  const series = [
    buildSeries(props.primaryLegend || 'primary', props.primaryColor, mainData),
    ...(hasSecondary.value
      ? [buildSeries(props.secondaryLegend || 'secondary', props.secondaryColor, secondaryData, true)]
      : [])
  ];

  return {
    animation: true,
    grid: {
      left: 8,
      right: 14,
      top: 18,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(24, 24, 24, 0.96)',
      borderColor: 'rgba(196, 158, 255, 0.22)',
      borderWidth: 1,
      padding: [10, 12],
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      extraCssText: 'border-radius: 6px; box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);',
      formatter: tooltipFormatter,
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(196, 158, 255, 0.32)',
          width: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels.value,
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.16)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        margin: 14
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.38)',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
          type: 'solid'
        }
      }
    },
    series: series as NonNullable<EChartsOption['series']>
  };
}

const option = computed<EChartsOption>(() => buildOption(mainValues.value, secondaryValues.value));

function renderChart() {
  if (!chartRef.value) return;

  if (!chart) {
    chart = init(chartRef.value, undefined, { renderer: 'canvas' });
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
  <div class="dashboard-chart-shell">
    <div v-if="primaryLegend || secondaryLegend" class="dashboard-chart-legend">
      <span v-if="primaryLegend" class="dashboard-chart-legend__item">
        <i :style="{ background: primaryColor }"></i>
        {{ primaryLegend }}
      </span>
      <span v-if="secondaryLegend" class="dashboard-chart-legend__item">
        <i :style="{ background: secondaryColor }"></i>
        {{ secondaryLegend }}
      </span>
    </div>

    <div ref="chartRef" class="dashboard-line-chart"></div>
  </div>
</template>
