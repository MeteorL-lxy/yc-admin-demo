<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

import type { TrendPoint } from '@/types/analytics';

const props = withDefaults(
  defineProps<{
    points: TrendPoint[];
    domId?: string;
    primaryColor?: string;
    secondaryColor?: string;
    primaryLegend?: string;
    secondaryLegend?: string;
  }>(),
  {
    domId: 'main',
    primaryColor: '#a259ff',
    secondaryColor: '#5ad7ff',
    primaryLegend: '',
    secondaryLegend: ''
  }
);

let myChart: echarts.EChartsType | null = null;

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
  if (!Array.isArray(params)) return '';

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

const option = computed<EChartsOption>(() => ({
  grid: {
    left: 2,
    right: 6,
    top: 10,
    bottom: 2,
    outerBoundsMode: 'same',
    outerBoundsContain: 'axisLabel'
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
        color: 'rgba(255, 255, 255, 0.12)'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 12,
      margin: 12
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
        color: 'rgba(255, 255, 255, 0.06)',
        type: 'solid'
      }
    }
  },
  series: [
    {
      name: props.primaryLegend || 'primary',
      type: 'line',
      data: mainValues.value,
      symbol: 'none',
      showSymbol: false,
      lineStyle: {
        color: props.primaryColor,
        width: 2.5
      },
      itemStyle: {
        color: props.primaryColor
      }
    },
    ...(hasSecondary.value
      ? [
          {
            name: props.secondaryLegend || 'secondary',
            type: 'line' as const,
            data: secondaryValues.value,
            symbol: 'none',
            showSymbol: false,
            lineStyle: {
              color: props.secondaryColor,
              width: 2,
              type: 'dashed' as const
            },
            itemStyle: {
              color: props.secondaryColor
            }
          }
        ]
      : [])
  ] as NonNullable<EChartsOption['series']>
}));

function applyOption() {
  if (!myChart) return;
  const nextOption = option.value;

  if (nextOption && typeof nextOption === 'object') {
    myChart.setOption(nextOption);
  }
}

function renderChart() {
  const chartDom = document.getElementById(props.domId);
  if (!chartDom) return;

  if (!myChart) {
    myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
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

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }

  myChart?.dispose();
  myChart = null;
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

    <div :id="domId" class="dashboard-line-chart"></div>
  </div>
</template>
