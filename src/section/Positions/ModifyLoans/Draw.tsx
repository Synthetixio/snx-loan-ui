import ActionPanel from '@/components/ActionPanel'
import ActionButton from '@/components/ActionButton'
import useSynthetixQueries from '@synthetixio/queries'
import { wei } from '@synthetixio/wei'
import { safeWei } from '@/utils/wei'
import { useRouter } from 'next/router'
import { calculateMaxDraw } from './helper'
import { ActionProps } from './type'
import Loans from '@/containers/Loans'
import { getSafeMinCRatioBuffer } from './helper'

const Draw = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}: ActionProps) => {
  const { useSynthetixTxn, useExchangeRatesQuery } = useSynthetixQueries()
  const router = useRouter()
  const valueWei = safeWei(value)
  const exchangeRatesQuery = useExchangeRatesQuery()
  const exchangeRates = exchangeRatesQuery.data ?? null
  const maxDraw = calculateMaxDraw(loan, exchangeRates)
  const txn = useSynthetixTxn(
    `CollateralEth`,
    `draw`,
    [Number(loan.id), valueWei.toBN()],
    gasPrice,
    {
      enabled: valueWei.gt(0),
      onSuccess: () => {
        router.push(`/position`)
      },
      onError: () => {
        console.error(`Something went wrong when repay the loan`)
      },
    }
  )

  const { minCRatio } = Loans.useContainer()

  const safeMinCratio = minCRatio
    ? minCRatio.add(getSafeMinCRatioBuffer(loan.currency, loan.collateralAsset))
    : wei(0)

  const repay = async () => {
    txn.mutate()
  }

  return (
    <>
      <ActionPanel
        safeMinCratio={safeMinCratio}
        errorMsg={txn.errorMessage}
        value={valueWei.gt(maxDraw) ? maxDraw.toString(2) : value}
        onGasChange={onGasChange}
        onChange={onChange}
        tokenList={[]}
        activeToken={activeToken}
        cRatio={wei(loan.cratio)}
        newCRatio={newCRatio}
        optimismLayerOneFee={txn.optimismLayerOneFee}
      />
      <ActionButton
        onClick={repay}
        msg={actionLabel}
        disabled={!!txn.errorMessage}
      />
    </>
  )
}

export default Draw
