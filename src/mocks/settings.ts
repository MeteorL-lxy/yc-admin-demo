import type { SettingsSnapshot } from '@/types/settings';

export const settingsMock: SettingsSnapshot = {
  languageOptions: [
    {
      code: 'zh',
      label: '简体中文',
      subtitle: '默认中文界面，适合中文内容运营与协作'
    },
    {
      code: 'en',
      label: 'English',
      subtitle: 'Recommended for viewing dashboard and revenue data in English'
    }
  ],
  language: 'zh',
  accountSettings: [
    {
      id: 'ad-monetization',
      title: '广告收益',
      description: '允许平台在免费章节中插入广告位，以带来额外收益。',
      enabled: true
    },
    {
      id: 'premium-preview',
      title: '付费前预览',
      description: '允许非粉丝在首个付费章节前解锁短预告，提高转化。',
      enabled: true
    },
    {
      id: 'auto-payout-report',
      title: '自动结算报告',
      description: '每次结算周期后，将对账摘要自动发送到主邮箱。',
      enabled: false
    }
  ]
};
