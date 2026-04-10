import type { PaymentAccount, WalletSummary, WithdrawRecord } from '@/types/wallet';

export const walletSummaryMock: WalletSummary = {
  availableBalance: 24850.36,
  withdrawingAmount: 1820.5,
  pendingAmount: 640.0,
  totalWithdraw: 98320.22
};

export const paymentAccountsMock: PaymentAccount[] = [
  {
    id: 'account-1',
    type: 'paypal',
    title: 'PayPal - Main',
    accountName: 'Luna Archive Studio',
    accountNo: 'studio@ycmail.com',
    note: 'Used for USD settlement',
    isDefault: true
  },
  {
    id: 'account-2',
    type: 'bank',
    title: 'Bank Account - HK',
    accountName: 'Luna Archive Studio Ltd.',
    accountNo: '**** 4831',
    note: 'International transfer in 1-3 business days',
    isDefault: false
  }
];

export const withdrawRecordsMock: WithdrawRecord[] = [
  {
    id: 'withdraw-1',
    status: 'processing',
    applyAmount: 1200,
    actualAmount: 1170,
    accountLabel: 'PayPal - Main',
    createdAt: '2026-04-08 16:25'
  },
  {
    id: 'withdraw-2',
    status: 'completed',
    applyAmount: 3200,
    actualAmount: 3136,
    accountLabel: 'Bank Account - HK',
    createdAt: '2026-04-02 10:40'
  },
  {
    id: 'withdraw-3',
    status: 'completed',
    applyAmount: 2180,
    actualAmount: 2136.4,
    accountLabel: 'PayPal - Main',
    createdAt: '2026-03-25 19:18'
  }
];
