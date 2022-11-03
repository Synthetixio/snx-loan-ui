import { Synths } from '@/constants/currency'
import { getExchangeRatesForCurrencies } from '@/utils/currencies'
import { Rates } from '@synthetixio/queries'
import Wei, { wei } from '@synthetixio/wei'

type Asset = {
  amount: Wei
  asset: string
}

export const calculateLoanCRatio = (
  exchangeRates: Rates | null,
  collateral: Asset,
  debt: Asset
) => {
  if (!exchangeRates || collateral.amount.eq(0) || debt.amount.eq(0)) {
    return wei(0)
  }

  const collateralUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    Synths.sETH,
    Synths.sUSD
  )

  const debtUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    debt.asset,
    Synths.sUSD
  )

  return collateral.amount
    .mul(collateralUSDPrice)
    .div(debtUSDPrice.mul(debt.amount))
}

export const calcSafeMaxCRatio = (
  exchangeRates: Rates | null,
  collateral: { amount: Wei; asset: string },
  debtName: string,
  safeMinCratio: Wei
) => {
  if (!exchangeRates || collateral.amount.eq(0)) {
    return wei(0)
  }
  const collateralUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    Synths.sETH,
    Synths.sUSD
  )

  const debtUSDPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    debtName,
    Synths.sUSD
  )

  return collateral.amount
    .mul(collateralUSDPrice)
    .div(safeMinCratio)
    .div(debtUSDPrice)
}

export const calcLiquidationPrice = (
  exchangeRates: Rates | null,
  minCRatio: Wei
) => {
  const ethPrice = getExchangeRatesForCurrencies(
    exchangeRates,
    Synths.sETH,
    Synths.sUSD
  )

  return {
    ethPrice,
    liquidationPrice: ethPrice.div(minCRatio),
  }

  // 1400 / 1.2 => liq price
  // 500
}
