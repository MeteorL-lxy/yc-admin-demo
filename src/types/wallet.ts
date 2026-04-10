export type PaymentAccountType = 'paypal' | 'bank';
export type WithdrawStatus = 'processing' | 'completed' | 'rejected';

export interface WalletSummary {
  availableBalance: number;
  withdrawingAmount: number;
  pendingAmount: number;
  totalWithdraw: number;
}

export interface PaymentAccount {
  id: string;
  type: PaymentAccountType;
  title: string;
  accountName: string;
  accountNo: string;
  note: string;
  isDefault: boolean;
}

export interface WithdrawRecord {
  id: string;
  status: WithdrawStatus;
  applyAmount: number;
  actualAmount: number;
  accountLabel: string;
  createdAt: string;
}

export interface WalletDashboard {
  summary: WalletSummary;
  accounts: PaymentAccount[];
  records: WithdrawRecord[];
}

export interface WithdrawDraft {
  amount: number;
  accountId: string;
}

export interface PaymentAccountDraft {
  type: PaymentAccountType;
  title: string;
  accountName: string;
  accountNo: string;
  note: string;
}
