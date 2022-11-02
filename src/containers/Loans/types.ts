import { BigNumber } from 'ethers';

export type Loan = {
  account: string;
  amount: BigNumber;
  collateral: BigNumber;
  cratio: BigNumber;
  minCratio: BigNumber;
  currency: string;
  collateralAsset: string;
  id: BigNumber;
  accruedInterest: BigNumber;
  interestIndex: BigNumber;
  lastInteraction: BigNumber;
};

export type LoanGraphql = {
  isOpen: boolean;
  id: string;
  hasPartialLiquidations: boolean;
  currency: string;
  createdAt: string;
  collateralMinted: string;
  collateralAmount: string;
  closedAt: string;
  amount: string;
  txHash: string;
};
