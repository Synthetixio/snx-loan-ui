import { sUSD, sETH, TokenInterface, ETH } from '@/constants/tokens';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';

type Asset = {
  asset: string;
  amount: BigNumber;
};

type WeiAsset = {
  asset: string;
  amount: Wei;
};

type useActionType = {
  action: string;
  value: string;
  loan: Asset;
  collateral: Asset;
};

export interface useActionReturn {
  activeToken: TokenInterface;
  loan: WeiAsset;
  collateral: WeiAsset;
  actionLabel: string;
}

const TokenList: Record<string, TokenInterface> = {
  sUSD,
  sETH,
  ETH,
};

const safeWei = (value: string) => {
  return value ? wei(value, 18) : wei(0);
};

const ActionButtonLabels: Record<string, string> = {
  draw: `Draw More`,
  repay: `Repay Loan`,
  deposit: `Deposit Collateral`,
  withdraw: `Withdraw Collateral`,
  close: `Close Loan`,
};

function useAction({
  action,
  value,
  loan,
  collateral,
}: useActionType): useActionReturn {
  let loanWei = wei(loan.amount, 18);
  let collateralWei = wei(collateral.amount, 18);
  let activeToken = TokenList[loan.asset];
  const valueWei = safeWei(value);
  switch (action) {
    case `draw`:
      loanWei = loanWei.add(valueWei);
      break;
    case `repay`:
      loanWei = loanWei.sub(valueWei);
      break;
    case `deposit`:
      collateralWei = collateralWei.add(valueWei);
      activeToken = TokenList[collateral.asset];
      break;
    case `withdraw`:
      collateralWei = collateralWei.sub(valueWei);
      activeToken = TokenList[collateral.asset];
      break;
    default:
      loanWei = wei(0);
      break;
  }

  return {
    loan: {
      asset: loan.asset,
      amount: loanWei,
    },
    collateral: {
      asset: collateral.asset,
      amount: collateralWei,
    },
    activeToken,
    actionLabel: ActionButtonLabels[action]
  };
}

export default useAction;
