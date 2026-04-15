import type { AppLanguage } from '@/types/settings';

interface MessageTree {
  [key: string]: string | MessageTree;
}

export const messages: Record<AppLanguage, MessageTree> = {
  zh: {
    common: {
      retry: '重试',
      search: '查询',
      reset: '重置',
      close: '关闭',
      back: '返回',
      loading: '加载中...',
      noData: '暂无数据'
    },
    sidebar: {
      profile: '创作者主页',
      analytics: '数据概览',
      revenue: '收入分析',
      wallet: '钱包',
      settings: '设置',
      promoTitle: '把创作者后台放到同一个工作台',
      promoDesc: '在一个侧边栏里切换数据、收入、提现和账户设置。',
      promoAction: '打开数据面板'
    },
    analytics: {
      title: '数据概览',
      subtitle: '查看作品表现、读者质量与收益趋势，快速定位增长机会。',
      range7d: '7天',
      range28d: '28天',
      range90d: '90天',
      selectWork: '选择作品',
      aiEyebrow: 'AI 诊断',
      aiTitle: 'AI 增长诊断',
      startAnalysis: '开始 AI 分析',
      overview: '总览',
      audience: '受众',
      loading: '正在加载数据概览...',
      loadError: '数据概览加载失败',
      siteTraffic: '站内流量',
      siteTrafficDesc: '所选时间范围内的浏览量与访客变化',
      viewsLegend: '浏览量',
      visitorsLegend: '访客数',
      workContribution: '作品贡献',
      workContributionDesc: '各作品收益占比',
      workContributionCenter: '收益构成',
      audienceHeatmap: '阅读活跃热力图',
      audienceHeatmapDesc: '晚间时段依旧是最强阅读窗口',
      fanLoyalty: '粉丝忠诚度',
      fanLoyaltyDesc: '读者回访频次分布',
      fanLoyaltyCenter: '用户忠诚度',
      recentActivity: '最近阅读行为',
      recentActivityDesc: '最近产生高价值的阅读会话',
      recentActivityEmpty: '当前暂无阅读行为',
      metricsAndSuggestions: '核心指标与运营建议',
      metricsAndSuggestionsDesc: '为运营排期提供的读者质量概览',
      aiModalDesc: 'AI 诊断会基于当前筛选条件，总结最值得跟进的增长信号。'
    },
    revenue: {
      title: '收入分析',
      subtitle: '追踪支付趋势、付费用户与作品收益构成。',
      lastUpdated: '最近更新 {time}',
      detail: '收入明细',
      detailTitle: '收入明细',
      detailSubtitle: '按作品和受众维度查看收入明细数据。',
      backToRevenue: '返回收入分析',
      startDate: '开始日期',
      endDate: '结束日期',
      audienceType: '受众类型',
      workName: '作品名称',
      workType: '作品类型',
      allAudience: '全部受众',
      follower: '粉丝',
      nonFollower: '非粉丝',
      allTypes: '全部类型',
      novel: '小说',
      drama: '短剧',
      loading: '正在加载收入分析...',
      loadError: '收入分析加载失败',
      detailLoadError: '收入明细加载失败',
      amountTrend: '支付金额趋势',
      amountTrendDesc: '所选条件下的每日支付金额',
      amountLegend: '支付金额',
      payingTrend: '付费人数趋势',
      payingTrendDesc: '每日付费用户数量变化',
      payingLegend: '付费人数',
      breakdown: '收入拆分',
      breakdownDesc: '筛选后的作品收益占比',
      breakdownCenter: '作品构成',
      columns: {
        date: '日期',
        work: '作品',
        type: '类型',
        audience: '受众',
        revenue: '收入',
        paidUsers: '付费人数',
        freeUsers: '免费用户',
        orders: '订单数'
      }
    },
    wallet: {
      title: '钱包',
      subtitle: '管理可提现余额、收款方式与结算记录。',
      loading: '正在加载钱包...',
      loadError: '钱包加载失败',
      available: '可提现余额',
      availableDesc: '收益将按当前提现费率自动结算到你选择的收款账户。',
      withdrawNow: '立即提现',
      withdrawing: '提现中',
      pending: '待结算',
      totalWithdraw: '累计提现',
      quickActions: '快捷操作',
      quickActionsDesc: '在下一次结算前管理你的收款账户',
      paymentManagement: '收款管理',
      paymentManagementDesc: '查看默认收款账户，或新增新的结算方式。',
      openPaymentManagement: '打开收款管理',
      records: '提现记录',
      recordsDesc: '最近的结算申请与状态更新',
      withdrawModalTitle: '发起提现',
      amount: '提现金额',
      withdrawAll: '全部提现',
      availableBalance: '可提现余额：{amount}',
      paymentAccount: '收款账户',
      paymentAccountPlaceholder: '请选择收款账户',
      withdrawNotice: '系统会按 2.5% 结算手续费自动扣减到账金额，提交后记录会立即出现在列表中。',
      confirmWithdraw: '确认提现',
      columns: {
        status: '状态',
        applyAmount: '申请金额',
        actualAmount: '到账金额',
        account: '收款账户',
        createdAt: '申请时间'
      },
      status: {
        processing: '处理中',
        completed: '已完成',
        rejected: '已拒绝'
      },
      paymentManagementTitle: '收款管理',
      paymentManagementSubtitle: '管理创作者后台用于结算的收款账户。',
      addAccount: '新增账户',
      accountType: '账户类型',
      accountTitle: '账户标题',
      accountName: '账户名称',
      accountNo: '账号信息',
      note: '说明',
      saveAccount: '保存账户',
      setDefault: '设为默认',
      defaultTag: '默认',
      backToWallet: '返回钱包',
      loadingAccounts: '正在加载收款账户...',
      loadAccountsError: '收款账户加载失败',
      accountTypePaypal: 'PayPal',
      accountTypeBank: '银行卡转账',
      titlePlaceholder: '例如：PayPal 主账户',
      namePlaceholder: '账户持有人或 PayPal 名称',
      accountNoPlaceholder: '邮箱或银行卡尾号',
      notePlaceholder: '结算备注说明'
    },
    settings: {
      title: '设置',
      subtitle: '调整工作台语言和账户级收益相关设置。',
      loading: '正在加载设置...',
      loadError: '设置加载失败',
      basic: '基础设置',
      account: '账户设置',
      languageUpdated: '语言已切换',
      accountUpdated: '账户设置已更新',
      languages: {
        en: {
          label: 'English',
          subtitle: '适合需要使用英文查看后台与收入数据的场景'
        },
        zh: {
          label: '简体中文',
          subtitle: '默认中文界面，适合中文内容运营与协作'
        }
      },
      accountItems: {
        adMonetization: {
          title: '广告收益',
          description: '允许平台在免费章节中插入广告位，以带来额外收益。'
        },
        premiumPreview: {
          title: '付费前预览',
          description: '允许非粉丝在首个付费章节前解锁短预告，提高转化。'
        },
        autoPayoutReport: {
          title: '自动结算报告',
          description: '每次结算周期后，将对账摘要自动发送到主邮箱。'
        }
      }
    },
    profile: {
      loading: '正在加载创作者主页...',
      loadError: '主页数据加载失败',
      hero: {
        backgroundAlt: '背景图',
        genreTag: '小说',
        editProfile: '编辑资料',
        inviteCode: '邀请码'
      },
      works: {
        workspace: '创作者工作台',
        title: '我的作品',
        upload: '上传作品',
        loading: '正在加载作品数据...',
        loadError: '作品加载失败',
        emptyTitle: '还没有作品',
        emptyDescription: '先创建一个新作品，把这个主页填满成完整的创作者门面。',
        create: '创建作品',
        filters: {
          all: '全部作品',
          published: '已发布',
          draft: '草稿箱'
        }
      },
      workCard: {
        status: {
          published: '已发布',
          draft: '草稿'
        },
        category: {
          novel: '小说',
          drama: '短剧'
        },
        novelEpisodeUnit: '章',
        dramaEpisodeUnit: '集',
        wordUnit: '字',
        viewsUnit: '浏览',
        collectsUnit: '收藏'
      },
      stats: {
        novels: '小说',
        followers: 'Followers',
        collects: '收藏'
      },
      editModal: {
        title: '编辑个人资料',
        backgroundPreviewAlt: '背景图预览',
        changeBackground: '更换背景图',
        avatarEditorTitle: '头像裁剪编辑器',
        avatarEditorDescription: '拖动或缩放裁剪框选择头像区域，同时生成方形和圆形头像。',
        uploadAvatar: '上传头像',
        resetCrop: '重置裁剪',
        cropSourceAlt: '裁剪源图',
        squareAvatar: '方形头像',
        squareAvatarAlt: '方形头像预览',
        circleAvatar: '圆形头像',
        circleAvatarAlt: '圆形头像预览',
        confirmCrop: '确认裁剪并保存头像',
        accountInfo: '账号信息',
        email: '邮箱',
        phone: '手机',
        inviteCode: '邀请码',
        userId: '用户 ID',
        nickname: '用户昵称',
        nicknamePlaceholder: '请输入用户昵称',
        signature: '个性签名',
        signaturePlaceholder: '这个人很懒，还没有个性签名',
        saving: '保存中...',
        cancel: '取消',
        save: '保存修改',
        errors: {
          readFile: '读取文件失败',
          avatarLoad: '头像资源加载失败',
          imageOnly: '请选择图片文件',
          backgroundTooLarge: '背景图大小不能超过 10MB',
          nicknameRequired: '请输入用户昵称'
        },
        messages: {
          cropReset: '裁剪框已重置',
          cropSaved: '头像已裁剪并暂存，保存修改后生效',
          avatarLoaded: '头像已载入裁剪器，请确认裁剪后再保存',
          backgroundUpdated: '背景图已更新预览'
        }
      },
      errors: {
        fetchProfile: '获取用户信息失败',
        fetchWorks: '获取作品列表失败',
        saveProfile: '保存失败，请稍后重试'
      },
      messages: {
        profileUpdated: '个人资料已更新'
      }
    },
    series: {
      loading: '正在加载作品详情...',
      loadError: '作品详情加载失败',
      notFound: '作品不存在',
      backToProfile: '返回主页',
      description: '作品简介',
      info: '作品信息',
      status: '状态',
      category: '类型',
      episodes: '集数',
      words: '字数',
      views: '浏览',
      collects: '收藏',
      score: '评分',
      statusPublished: '已发布',
      statusDraft: '草稿',
      categoryNovel: '小说',
      categoryDrama: '短剧',
      novelEpisodeUnit: '章',
      dramaEpisodeUnit: '集',
      wordUnit: '字',
      viewsUnit: '浏览',
      collectsUnit: '收藏'
    },
    service: {
      analytics: {
        allWorks: '全部作品',
        totalViews: '总浏览量',
        totalViewsHelper: '当前筛选内容的累计浏览',
        visitors: '访客数',
        visitorsHelper: '时间范围内独立读者数',
        revenue: '收益',
        revenueHelper: '付费阅读与订阅收入',
        fanRatio: '粉丝占比',
        fanRatioHelper: '活跃读者中的粉丝占比',
        workContributionCenter: '收益构成',
        dailyReturn: '日回访',
        weeklyReturn: '周回访',
        occasional: '偶发回访',
        high: '高',
        stable: '稳定',
        low: '较低',
        avgReadTime: '平均阅读时长',
        completionRate: '完读率',
        shareConversion: '分享转化率',
        avgReadTimeNote: '长篇章节仍然带来更长的停留时间',
        completionRateNote: '周末章节的完读率表现最好',
        shareConversionNote: '短剧切片在站外分享中的转化更高',
        suggestion1: '建议在周五晚间发布一章中篇付费内容，承接当前最强活跃窗口。',
        suggestion2: '在剧情高潮后补一条短预告，提升非粉丝的首付费转化。',
        suggestion3: '把角色标签与悬念卖点在封面附近展示得更明显。',
        insightTitle: 'AI 增长诊断',
        insightSummary: '最强增长来自晚间回访读者，他们在高峰时段拥有更高完读率。',
        tag1: '晚间高活跃',
        tag2: '忠诚用户高',
        tag3: '付费章节势能',
        diagnosis1: '20:00 到 00:00 的阅读峰值最明显，这部分用户的完读率最高。',
        diagnosis2: '《午夜档案室》依旧是主要变现来源，《月蚀剧场》的增速更快。',
        diagnosis3: '粉丝转化健康，但非粉丝仍然主要依赖高悬念章节完成转化。',
        nextAction: '接下来两周优先安排周五晚间的 premium 更新，并配合一条剧情预告。',
        diagnosisTopSignal: '核心信号：{summary}',
        diagnosisLoyalty: '读者忠诚度：高频回访用户仍然是当前最主要的增长引擎。',
        diagnosisAction: '建议动作：{action}',
        otherWorks: '其他作品'
      },
      revenue: {
        totalRevenue: '总收入',
        totalRevenueNote: '所选时间范围收入总和',
        avgRevenue: '平均收入',
        avgRevenueNote: '按活跃日期计算的日均收入',
        paidVsFree: '付费/免费用户',
        paidVsFreeNote: '付费用户与活跃免费用户对比'
      }
    }
  },
  en: {
    common: {
      retry: 'Retry',
      search: 'Search',
      reset: 'Reset',
      close: 'Close',
      back: 'Back',
      loading: 'Loading...',
      noData: 'No data'
    },
    sidebar: {
      profile: 'Profile',
      analytics: 'Analytics',
      revenue: 'Revenue',
      wallet: 'Wallet',
      settings: 'Settings',
      promoTitle: 'Keep creator ops in one workspace',
      promoDesc: 'Switch between analytics, revenue, payouts and account settings from one sidebar.',
      promoAction: 'Open dashboard'
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Track performance, audience quality and revenue trends to spot the next growth move.',
      range7d: '7d',
      range28d: '28d',
      range90d: '90d',
      selectWork: 'Select work',
      aiEyebrow: 'AI diagnosis',
      aiTitle: 'AI growth diagnosis',
      startAnalysis: 'Start AI analysis',
      overview: 'Overview',
      audience: 'Audience',
      loading: 'Loading analytics dashboard...',
      loadError: 'Analytics failed to load',
      siteTraffic: 'Site traffic',
      siteTrafficDesc: 'Views and visitors trend for the selected period',
      viewsLegend: 'Views',
      visitorsLegend: 'Visitors',
      workContribution: 'Work contribution',
      workContributionDesc: 'Revenue share by work',
      workContributionCenter: 'Revenue mix',
      audienceHeatmap: 'Reading activity heatmap',
      audienceHeatmapDesc: 'Late-night sessions remain the strongest usage window',
      fanLoyalty: 'Fan loyalty',
      fanLoyaltyDesc: 'How often your readers come back',
      fanLoyaltyCenter: 'Reader loyalty',
      recentActivity: 'Recent reading activity',
      recentActivityDesc: 'Latest high-value reading sessions',
      recentActivityEmpty: 'No reading activity yet',
      metricsAndSuggestions: 'Core metrics & suggestions',
      metricsAndSuggestionsDesc: 'Audience quality snapshot for operations planning',
      aiModalDesc: 'The AI diagnosis summarizes the strongest growth signals from your selected range and work mix.'
    },
    revenue: {
      title: 'Revenue',
      subtitle: 'Monitor payment trends, paying audience and work-level monetization performance.',
      lastUpdated: 'Last updated {time}',
      detail: 'Revenue detail',
      detailTitle: 'Revenue detail',
      detailSubtitle: 'Inspect monetization performance by work and audience segment.',
      backToRevenue: 'Back to revenue',
      startDate: 'Start date',
      endDate: 'End date',
      audienceType: 'Audience type',
      workName: 'Work name',
      workType: 'Work type',
      allAudience: 'All audience',
      follower: 'Follower',
      nonFollower: 'Non-follower',
      allTypes: 'All types',
      novel: 'Novel',
      drama: 'Drama',
      loading: 'Loading revenue dashboard...',
      loadError: 'Revenue failed to load',
      detailLoadError: 'Revenue detail failed to load',
      amountTrend: 'Payment amount trend',
      amountTrendDesc: 'Daily payment amount within selected filters',
      amountLegend: 'Payment amount',
      payingTrend: 'Paying count trend',
      payingTrendDesc: 'Daily paying user counts',
      payingLegend: 'Paying users',
      breakdown: 'Revenue breakdown',
      breakdownDesc: 'Work contribution after filters',
      breakdownCenter: 'Work split',
      columns: {
        date: 'Date',
        work: 'Work',
        type: 'Type',
        audience: 'Audience',
        revenue: 'Revenue',
        paidUsers: 'Paid users',
        freeUsers: 'Free users',
        orders: 'Orders'
      }
    },
    wallet: {
      title: 'Wallet',
      subtitle: 'Manage withdrawable balance, payout methods and settlement records.',
      loading: 'Loading wallet...',
      loadError: 'Wallet failed to load',
      available: 'Available to withdraw',
      availableDesc: 'Withdraw earnings to your preferred payment account with the current payout fee applied automatically.',
      withdrawNow: 'Withdraw now',
      withdrawing: 'Withdrawing',
      pending: 'Pending',
      totalWithdraw: 'Total withdraw',
      quickActions: 'Quick actions',
      quickActionsDesc: 'Manage payout accounts before the next settlement cycle',
      paymentManagement: 'Payment management',
      paymentManagementDesc: 'Review default payout account or add a new settlement method.',
      openPaymentManagement: 'Open payment management',
      records: 'Withdraw records',
      recordsDesc: 'Recent settlement requests and status updates',
      withdrawModalTitle: 'Withdraw funds',
      amount: 'Amount',
      withdrawAll: 'Withdraw all',
      availableBalance: 'Available balance: {amount}',
      paymentAccount: 'Payment account',
      paymentAccountPlaceholder: 'Select payout account',
      withdrawNotice: 'A 2.5% payout processing fee will be deducted from the applied amount. Processing records will appear in the table immediately after submission.',
      confirmWithdraw: 'Confirm withdraw',
      columns: {
        status: 'Status',
        applyAmount: 'Apply amount',
        actualAmount: 'Actual amount',
        account: 'Account',
        createdAt: 'Created at'
      },
      status: {
        processing: 'processing',
        completed: 'completed',
        rejected: 'rejected'
      },
      paymentManagementTitle: 'Payment management',
      paymentManagementSubtitle: 'Manage settlement accounts used for creator payouts.',
      addAccount: 'Add account',
      accountType: 'Account type',
      accountTitle: 'Title',
      accountName: 'Account name',
      accountNo: 'Account no.',
      note: 'Note',
      saveAccount: 'Save account',
      setDefault: 'Set as default',
      defaultTag: 'Default',
      backToWallet: 'Back to wallet',
      loadingAccounts: 'Loading payment accounts...',
      loadAccountsError: 'Payment accounts failed to load',
      accountTypePaypal: 'PayPal',
      accountTypeBank: 'Bank transfer',
      titlePlaceholder: 'e.g. PayPal - Main',
      namePlaceholder: 'Account holder or PayPal name',
      accountNoPlaceholder: 'Email or masked bank number',
      notePlaceholder: 'Settlement description'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Adjust workspace language and account-level monetization preferences.',
      loading: 'Loading settings...',
      loadError: 'Settings failed to load',
      basic: 'Basic',
      account: 'Account',
      languageUpdated: 'Language updated.',
      accountUpdated: 'Account setting updated.',
      languages: {
        en: {
          label: 'English',
          subtitle: 'Recommended for viewing dashboard and revenue data in English'
        },
        zh: {
          label: '简体中文',
          subtitle: 'Default Chinese workspace for creator operations and collaboration'
        }
      },
      accountItems: {
        adMonetization: {
          title: 'Ad monetization',
          description: 'Allow platform ad inventory to be inserted in free chapters for incremental income.'
        },
        premiumPreview: {
          title: 'Premium preview access',
          description: 'Let non-followers unlock a short teaser before the first paid chapter.'
        },
        autoPayoutReport: {
          title: 'Auto payout report',
          description: 'Send payout reconciliation summary to your primary email every payout cycle.'
        }
      }
    },
    profile: {
      loading: 'Loading creator profile...',
      loadError: 'Failed to load profile data',
      hero: {
        backgroundAlt: 'Background image',
        genreTag: 'Novel',
        editProfile: 'Edit profile',
        inviteCode: 'Invite code'
      },
      works: {
        workspace: 'Creator workspace',
        title: 'My works',
        upload: 'Upload work',
        loading: 'Loading works...',
        loadError: 'Failed to load works',
        emptyTitle: 'No works yet',
        emptyDescription: 'Create your first work and start filling this creator profile.',
        create: 'Create work',
        filters: {
          all: 'All works',
          published: 'Published',
          draft: 'Drafts'
        }
      },
      workCard: {
        status: {
          published: 'Published',
          draft: 'Draft'
        },
        category: {
          novel: 'Novel',
          drama: 'Drama'
        },
        novelEpisodeUnit: 'chapters',
        dramaEpisodeUnit: 'episodes',
        wordUnit: 'words',
        viewsUnit: 'views',
        collectsUnit: 'favorites'
      },
      stats: {
        novels: 'Novels',
        followers: 'Followers',
        collects: 'Favorites'
      },
      editModal: {
        title: 'Edit profile',
        backgroundPreviewAlt: 'Background preview',
        changeBackground: 'Change background',
        avatarEditorTitle: 'Avatar crop editor',
        avatarEditorDescription: 'Drag or resize the crop box to generate both square and circular avatars.',
        uploadAvatar: 'Upload avatar',
        resetCrop: 'Reset crop',
        cropSourceAlt: 'Crop source image',
        squareAvatar: 'Square avatar',
        squareAvatarAlt: 'Square avatar preview',
        circleAvatar: 'Circle avatar',
        circleAvatarAlt: 'Circle avatar preview',
        confirmCrop: 'Confirm crop and save avatar',
        accountInfo: 'Account information',
        email: 'Email',
        phone: 'Phone',
        inviteCode: 'Invite code',
        userId: 'User ID',
        nickname: 'Nickname',
        nicknamePlaceholder: 'Please enter a nickname',
        signature: 'Signature',
        signaturePlaceholder: 'No signature yet',
        saving: 'Saving...',
        cancel: 'Cancel',
        save: 'Save changes',
        errors: {
          readFile: 'Failed to read file',
          avatarLoad: 'Failed to load avatar source',
          imageOnly: 'Please select an image file',
          backgroundTooLarge: 'Background image must be smaller than 10MB',
          nicknameRequired: 'Please enter a nickname'
        },
        messages: {
          cropReset: 'Crop box has been reset',
          cropSaved: 'Avatar has been cropped and staged. Save changes to apply.',
          avatarLoaded: 'Avatar loaded into crop editor. Confirm crop before saving.',
          backgroundUpdated: 'Background preview updated'
        }
      },
      errors: {
        fetchProfile: 'Failed to fetch profile data',
        fetchWorks: 'Failed to fetch works list',
        saveProfile: 'Failed to save profile. Please try again later.'
      },
      messages: {
        profileUpdated: 'Profile updated'
      }
    },
    series: {
      loading: 'Loading work detail...',
      loadError: 'Failed to load work detail',
      notFound: 'Work not found',
      backToProfile: 'Back to profile',
      description: 'Description',
      info: 'Work info',
      status: 'Status',
      category: 'Category',
      episodes: 'Episodes',
      words: 'Words',
      views: 'Views',
      collects: 'Favorites',
      score: 'Score',
      statusPublished: 'Published',
      statusDraft: 'Draft',
      categoryNovel: 'Novel',
      categoryDrama: 'Drama',
      novelEpisodeUnit: 'chapters',
      dramaEpisodeUnit: 'episodes',
      wordUnit: 'words',
      viewsUnit: 'views',
      collectsUnit: 'favorites'
    },
    service: {
      analytics: {
        allWorks: 'All works',
        totalViews: 'Total views',
        totalViewsHelper: 'Across all selected content',
        visitors: 'Visitors',
        visitorsHelper: 'Unique readers in range',
        revenue: 'Revenue',
        revenueHelper: 'Paid reading + subscriptions',
        fanRatio: 'Fan ratio',
        fanRatioHelper: 'Followers among active readers',
        workContributionCenter: 'Revenue mix',
        dailyReturn: 'Daily return',
        weeklyReturn: 'Weekly return',
        occasional: 'Occasional',
        high: 'High',
        stable: 'Stable',
        low: 'Low',
        avgReadTime: 'Avg. read time',
        completionRate: 'Completion rate',
        shareConversion: 'Share conversion',
        avgReadTimeNote: 'Audience stays longer on long-form episodes',
        completionRateNote: 'Weekend chapters have the best finish rate',
        shareConversionNote: 'Drama snippets perform best on referrals',
        suggestion1: 'Push one mid-length paid chapter on Friday night to capture the strongest return window.',
        suggestion2: 'Bundle short recap posts for non-followers after each plot spike to improve first-pay conversion.',
        suggestion3: 'Surface lead-character tags more prominently on Eclipse Theater and Midnight Archive.',
        insightTitle: 'AI growth diagnosis',
        insightSummary: 'Your strongest uplift comes from loyal readers returning during late-evening reading sessions.',
        tag1: 'Late-night audience',
        tag2: 'High loyal ratio',
        tag3: 'Paid chapter momentum',
        diagnosis1: 'Traffic peaks between 20:00 and 00:00, and those users show the highest completion rate.',
        diagnosis2: 'Midnight Archive remains the main monetization driver, but Eclipse Theater is gaining faster.',
        diagnosis3: 'Follower conversion is healthy, while non-follower conversion still relies on cliffhanger chapters.',
        nextAction: 'Schedule premium drops during the next 2 Friday evenings and pair them with a short teaser clip.',
        diagnosisTopSignal: 'Top signal: {summary}',
        diagnosisLoyalty: 'Reader loyalty: the high-return segment remains the strongest growth engine.',
        diagnosisAction: 'Suggested action: {action}',
        otherWorks: 'Other works'
      },
      revenue: {
        totalRevenue: 'Total revenue',
        totalRevenueNote: 'Selected date range total',
        avgRevenue: 'Average revenue',
        avgRevenueNote: 'Average per active day',
        paidVsFree: 'Paid / Free users',
        paidVsFreeNote: 'Purchase users vs. active free readers'
      }
    }
  }
};
