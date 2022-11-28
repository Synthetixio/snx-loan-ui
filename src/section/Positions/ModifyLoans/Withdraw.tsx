import { wei } from "@synthetixio/wei";
import { useRouter } from "next/router";
import Loans from "@/containers/Loans";
import useSynthetixQueries from "@synthetixio/queries";
import { ActionProps } from "./type";
import { safeWei } from "@/utils/wei";
import { getSafeMinCRatioBuffer } from "./helper";

import ActionPanel from "@/components/ActionPanel";
import ActionButton from "@/components/ActionButton";
import { useLiquidationPrice2 } from "@/hooks/useLiquidationPrice";

const Withdraw: React.FC<ActionProps> = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}) => {
  const { reloadPendingWithdrawals, minCRatio } = Loans.useContainer();
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();
  const withdrawalAmount = safeWei(value);

  const withdrawTxn = useSynthetixTxn(
    `CollateralEth`,
    `withdraw`,
    [Number(loan.id), withdrawalAmount.toBN()],
    gasPrice,
    {
      enabled: !withdrawalAmount.eq(0),
      onSuccess: async () => {
        await reloadPendingWithdrawals();
        router.push(`/position`);
      },
    }
  );

  const withdraw = async () => {
    withdrawTxn.mutate();
  };
  let errorMsg = withdrawTxn.errorMessage;
  if (value !== `` && newCRatio.lt(minCRatio)) {
    errorMsg = `C-Ratio is too low`;
  }

  const safeMinCratio = minCRatio
    ? minCRatio.add(getSafeMinCRatioBuffer(loan.currency, loan.collateralAsset))
    : wei(0);

  const liquidationPrice = useLiquidationPrice2(
    wei(loan.collateral.sub(withdrawalAmount.toBN())),
    wei(loan.amount),
    loan.currency
  );

  return (
    <>
      <ActionPanel
        {...{
          liquidationPrice,
          safeMinCratio,
          errorMsg,
          tokenList: [],
          onChange,
          value,
          onGasChange,
          activeToken,
          cRatio: wei(loan.cratio),
          newCRatio,
          optimismLayerOneFee: withdrawTxn.optimismLayerOneFee,
        }}
      />
      <ActionButton
        onClick={withdraw}
        msg={actionLabel}
        disabled={!!errorMsg}
      />
    </>
  );
};

export default Withdraw;
