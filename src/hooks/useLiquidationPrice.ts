import { wei } from '@synthetixio/wei'
import { Synths } from '@/constants/currency'
import useSynthetixQueries from '@synthetixio/queries'
import Loans from '@/containers/Loans'
import { getExchangeRatesForCurrencies } from '@/utils/currencies'

function useLiquidationPrice() {
  const { useExchangeRatesQuery } = useSynthetixQueries()
  const exchangeRatesQuery = useExchangeRatesQuery()
  const exchangeRates = exchangeRatesQuery.data || null
  const { minCRatio } = Loans.useContainer()

  const ethPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    Synths.sETH,
    Synths.sUSD
  )

  return {
    ethPrice,
    liquidationPrice: minCRatio.gt(0) ? ethPrice.div(minCRatio): wei(0),
  }
}

export default useLiquidationPrice
