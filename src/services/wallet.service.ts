import { paymentAccountsMock, walletSummaryMock, withdrawRecordsMock } from '@/mocks/wallet';
import type { PaymentAccount, PaymentAccountDraft, WalletDashboard, WithdrawDraft, WithdrawRecord } from '@/types/wallet';

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

let summarySnapshot = { ...walletSummaryMock };
let accountsSnapshot = paymentAccountsMock.map((account) => ({ ...account }));
let recordsSnapshot = withdrawRecordsMock.map((record) => ({ ...record }));

const cloneAccounts = () => accountsSnapshot.map((account) => ({ ...account }));
const cloneRecords = () => recordsSnapshot.map((record) => ({ ...record }));

export async function fetchWalletDashboard(): Promise<WalletDashboard> {
  await delay();
  return {
    summary: { ...summarySnapshot },
    accounts: cloneAccounts(),
    records: cloneRecords()
  };
}

export async function submitWithdraw(draft: WithdrawDraft): Promise<void> {
  await delay(420);

  const account = accountsSnapshot.find((item) => item.id === draft.accountId);

  if (!account) {
    throw new Error('Please select a valid payout account.');
  }

  if (draft.amount <= 0 || draft.amount > summarySnapshot.availableBalance) {
    throw new Error('Withdrawal amount exceeds available balance.');
  }

  const actualAmount = Number((draft.amount * 0.975).toFixed(2));

  summarySnapshot = {
    ...summarySnapshot,
    availableBalance: Number((summarySnapshot.availableBalance - draft.amount).toFixed(2)),
    withdrawingAmount: Number((summarySnapshot.withdrawingAmount + draft.amount).toFixed(2))
  };

  const nextRecord: WithdrawRecord = {
    id: `withdraw-${Date.now()}`,
    status: 'processing',
    applyAmount: draft.amount,
    actualAmount,
    accountLabel: account.title,
    createdAt: '2026-04-09 20:10'
  };

  recordsSnapshot = [nextRecord, ...recordsSnapshot];
}

export async function addPaymentAccount(draft: PaymentAccountDraft): Promise<PaymentAccount[]> {
  await delay(320);

  const nextAccount: PaymentAccount = {
    id: `account-${Date.now()}`,
    ...draft,
    isDefault: accountsSnapshot.length === 0
  };

  accountsSnapshot = [nextAccount, ...accountsSnapshot];
  return cloneAccounts();
}

export async function setDefaultPaymentAccount(accountId: string): Promise<PaymentAccount[]> {
  await delay(220);

  accountsSnapshot = accountsSnapshot.map((account) => ({
    ...account,
    isDefault: account.id === accountId
  }));

  return cloneAccounts();
}
