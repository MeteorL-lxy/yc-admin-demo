import { computed, ref } from 'vue';

import { messages } from '@/locales/messages';
import type { AppLanguage } from '@/types/settings';

const STORAGE_KEY = 'yc-admin-locale';

function getInitialLocale(): AppLanguage {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'en' || saved === 'zh' ? saved : 'zh';
}

const localeState = ref<AppLanguage>(getInitialLocale());

function resolveMessage(path: string, source: Record<string, unknown>): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

export function getLocale() {
  return localeState.value;
}

export function setLocale(nextLocale: AppLanguage) {
  localeState.value = nextLocale;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  }
}

export function translate(path: string, params?: Record<string, string | number>) {
  const message = resolveMessage(path, messages[localeState.value]);

  if (typeof message !== 'string') {
    return path;
  }

  if (!params) {
    return message;
  }

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.split(`{${key}}`).join(String(value));
  }, message);
}

export function useLocale() {
  return {
    locale: computed(() => localeState.value),
    setLocale,
    t: translate
  };
}
