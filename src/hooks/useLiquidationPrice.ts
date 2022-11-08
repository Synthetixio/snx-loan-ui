import { wei } from "@synthetixio/wei";
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
    }
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

export default useLiquidationPrice;
