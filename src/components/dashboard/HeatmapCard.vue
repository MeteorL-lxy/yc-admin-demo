<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { init, use, type EChartsType } from 'echarts/core';

import type { AudienceHeatCell } from '@/types/analytics';

use([HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent, CanvasRenderer]);

const props = defineProps<{
  title: string;
  subtitle?: string;
  cells: AudienceHeatCell[];
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chart: EChartsType | null = null;
let resizeObserver: ResizeObserver | null = null;
let hasPlayedEnterAnimation = false;

const days = computed(() => [...new Set(props.cells.map((cell) => cell.day))]);
const hours = computed(() => [...new Set(props.cells.map((cell) => cell.hour))]);

const maxValue = computed(() => Math.max(...props.cells.map((cell) => cell.value), 100));

const seriesData = computed(() => {
  const dayIndexMap = new Map(days.value.map((day, index) => [day, index]));
  const hourIndexMap = new Map(hours.value.map((hour, index) => [hour, index]));

  return props.cells.map((cell) => [
    hourIndexMap.get(cell.hour) ?? 0,
    dayIndexMap.get(cell.day) ?? 0,
    cell.value
  ]);
});

function buildOption(data: number[][]): EChartsOption {
  return {
  animation: true,
  animationDuration: 1200,
  animationDurationUpdate: 700,
  animationEasing: 'quarticOut',
  animationEasingUpdate: 'quarticOut',
  grid: {
    left: 42,
    right: 8,
    top: 8,
    bottom: 8,
    containLabel: false
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#181818',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    textStyle: {
      color: '#ffffff',
      fontSize: 12
    },
    extraCssText: 'border-radius: 6px; box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);',
    formatter: (params) => {
      if (Array.isArray(params)) {
        return '';
      }

      const [hourIndex, dayIndex, value] = (params.value as number[]) ?? [0, 0, 0];
      const hour = hours.value[hourIndex] ?? '';
      const day = days.value[dayIndex] ?? '';

      return `${day} ${hour}<br/>${value}`;
    }
  },
  xAxis: {
    type: 'category',
    data: hours.value,
    position: 'top',
    splitArea: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 12,
      margin: 14
    }
  },
  yAxis: {
    type: 'category',
    data: days.value,
    inverse: false,
    splitArea: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 12,
      margin: 16
    }
  },
  visualMap: {
    show: false,
    min: 0,
    max: maxValue.value,
    calculable: false,
    inRange: {
      color: [
        '#201727',
        '#4d277b',
        '#7f35c7',
        '#a259ff',
        '#d7b8ff'
      ]
    }
  },
  series: [
    {
      type: 'heatmap',
      data,
      progressive: 0,
      animationDuration: 900,
      animationEasing: 'quarticOut',
      animationDelay: (index: number) => Math.min(index * 36, 620),
      itemStyle: {
        borderRadius: 8,
        borderColor: 'rgba(16, 16, 16, 0.92)',
        borderWidth: 6
      },
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(196, 158, 255, 0.4)',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(162, 89, 255, 0.28)'
        }
      }
    }
  ]
  } as EChartsOption;
}

const option = computed<EChartsOption>(() => buildOption(seriesData.value));

function renderChart() {
  if (!chartRef.value) return;

  if (!chart) {
    chart = init(chartRef.value, undefined, { renderer: 'canvas' });
  }

  const instance = chart;
  if (!hasPlayedEnterAnimation) {
    hasPlayedEnterAnimation = true;
    const zeroData = seriesData.value.map(([x, y]) => [x, y, 0]);

    instance.setOption(buildOption(zeroData), true);
    window.setTimeout(() => {
      instance.setOption(option.value, true);
      instance.resize();
    }, 120);
    return;
  }

  instance.setOption(option.value, true);
  instance.resize();
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
  <article class="yc-panel dashboard-heatmap-card">
    <div class="dashboard-card-header">
      <div>
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="description">{{ subtitle }}</p>
      </div>
    </div>

    <div ref="chartRef" class="dashboard-heatmap-chart"></div>
  </article>
</template>
