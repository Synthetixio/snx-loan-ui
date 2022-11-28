import Wei, { wei } from "@synthetixio/wei";
import { Synths } from "@/constants/currency";
import useSynthetixQueries from "@synthetixio/queries";
import Loans from "@/containers/Loans";
import { getExchangeRatesForCurrencies } from "@/utils/currencies";
import { Loan } from "@/containers/Loans/types";

function useLiquidationPrice(loan: Loan | undefined) {
  const { useExchangeRatesQuery } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const { minCRatio } = Loans.useContainer();

  if (!loan) {
    return {
      ethPrice: wei(0),
      liquidationPrice: wei(0),
    };
  }
  const { collateral, amount, currency } = loan;
  const ethPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    Synths.sETH,
    Synths.sUSD
  );

  const debtUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    currency,
    Synths.sUSD
  );

  const liquidationPrice = minCRatio
    .mul(amount)
    .mul(debtUSDPrice)
    .div(collateral);

  return {
    ethPrice,
    liquidationPrice: minCRatio.gt(0) ? liquidationPrice : wei(0),
  };
}

export function useLiquidationPrice2(
  collateralAmount: Wei,
  loanAmount: Wei,
  loanCurrency: string
) {
  const { useExchangeRatesQuery } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const { minCRatio } = Loans.useContainer();

  if (!loanAmount || loanAmount.lte(0)) {
    return wei(0);
  }

  if (!collateralAmount || collateralAmount.lte(0)) {
    return wei(0);
  }

  const loanUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    loanCurrency,
    Synths.sUSD
  );

  const liquidationPrice = minCRatio
    .mul(loanAmount)
    .mul(loanUSDPrice)
    .div(collateralAmount)

  return liquidationPrice
}

export default useLiquidationPrice;
