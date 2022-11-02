import styled from 'styled-components';
import Wei, { wei } from '@synthetixio/wei';
import { useState } from 'react';
import useTokensBalances from '@/hooks/useTokensBalances';
import { BaseCard } from '@/components/Base/Card';
import { FlexCol, FlexItemsCenter, Flex } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDown } from 'react-feather';
import { sUSD, ETH, sETH } from '@/constants/tokens';
import type { TokenInterface } from '@/constants/tokens';
import { Text12 } from '@/components/Base/Text';
import ActionPanel from '@/components/ActionPanel';
import TokenSelector from '@/components/TokenSelector';
import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import Connector from '@/containers/connector/Connector';
import Balance from '@/components/Balance';
import { calculateLoanCRatio } from '@/components/ActionPanel/utils';
import Loans from '@/containers/Loans';
import SubmitButton from './components/SubmitButton';
import { getSafeMinCRatioBuffer } from './utils';
import { ethers } from 'ethers';
import { useQuery } from 'react-query';
import generateWei from '@/utils/wei';
import { BaseButton } from '@/components/Base/Button';

export default function MainCard() {
  const { synthetixjs, isWalletConnected } = Connector.useContainer();
  const { minCRatio } = Loans.useContainer();
  const [collateralToken, setCollateralToken] = useState<TokenInterface>(ETH);
  const [debtToken, setDebtToken] = useState<TokenInterface>(sUSD);
  const [collateralInput, setCollateralInput] = useState<string>(``);
  const [debtInput, setDebtInput] = useState<string>(``);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>();
  const { useExchangeRatesQuery, useSynthetixTxn } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const collateralWei = generateWei(collateralInput, collateralToken);
  const debtWei = generateWei(debtInput, debtToken);
  const cRatio = calculateLoanCRatio(exchangeRates, collateralWei, debtWei);
  const safeMinCratio = minCRatio
    ? minCRatio.add(getSafeMinCRatioBuffer(debtWei.asset, collateralWei.asset))
    : wei(0);

  const loanContract = synthetixjs?.contracts.CollateralEth;
  const { data: minCollateralAmount = wei(0) } = useQuery<Wei>(
    [loanContract?.address],
    async () => {
      if (!loanContract) return wei(0);
      return wei(await loanContract.minCollateral());
    },
  );
  const openTxn = useSynthetixTxn(
    `CollateralEth`,
    `open`,
    [debtWei.amount.toBN(), ethers.utils.formatBytes32String(debtWei.asset)],
    {
      ...gasPrice,
      value: collateralWei.amount.toBN(),
    },
  );
  const onSubmit = () => {
    if (!openTxn) return;
    openTxn.mutate();
  };

  let errorMsg = openTxn.errorMessage;
  const collateralBalance = useTokensBalances();
  const hasLowCollateralAmount = collateralWei.amount.lt(minCollateralAmount);
  const hasLowCratio =
    !collateralWei.amount.eq(0) &&
    !debtWei.amount.eq(0) &&
    cRatio.lt(safeMinCratio);
  const hasInsufficientCollateral = collateralBalance.lt(minCollateralAmount);
  if (hasLowCollateralAmount) {
    errorMsg = `MINIMUM COLLATERAL IS ${minCollateralAmount.toString(2)}`;
  } else if (hasLowCratio) {
    errorMsg = `C-RATIO TOO LOW`;
  } else if (hasInsufficientCollateral) {
    errorMsg = `INSUFFICIENT COLLATERAL TO BORROW`;
  }

  return (
    <Container>
      <div>
        <Text12>Supply</Text12>
      </div>
      <TokenCard>
        <TokenSelector
          onClick={setCollateralToken}
          activeToken={collateralToken}
          tokenList={[]}
        />
        <BalanceContainer>
          <InputContainer>
            {/* <MaxButton>Max</MaxButton> */}
            <NumericInput
              value={collateralInput}
              placeholder="0.00"
              onChange={setCollateralInput}
            />
          </InputContainer>
          <Balance asset="ETH" />
        </BalanceContainer>
      </TokenCard>
      <IconArrow>
        <ArrowDown size={32} color="#9999AC" />
      </IconArrow>
      <ActionPanel
        tokenList={[sUSD, sETH]}
        errorMsg={errorMsg}
        onGasChange={setGasPrice}
        optimismLayerOneFee={openTxn.optimismLayerOneFee}
        cRatio={cRatio}
        value={debtInput}
        activeToken={debtToken}
        onClick={setDebtToken}
        onChange={setDebtInput}
      />
      <SubmitButton
        disabled={!!errorMsg}
        isWalletConnected={isWalletConnected}
        onClick={onSubmit}
      />
    </Container>
  );
}

const Container = styled(BaseCard)`
  padding: 10px;
  min-width: 648px;
  width: 46.388889%;
  margin-top: 19px;
`;

const TokenCard = styled(BaseCard)`
  padding: 10px 8px 12px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceContainer = styled(FlexCol)`
  align-items: flex-end;
`;

const IconArrow = styled(FlexItemsCenter)`
  border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  margin-bottom: 26px;
`;

const InputContainer = styled(Flex)`
  justify-content: flex-end;
  input {
    width: 20%;
  }
`;
const MaxButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.cyan500};
  font-weight: 700;
  background: unset;
  border: unset;
`;
