import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';
import useSynthetixQueries from '@synthetixio/queries';
import { wei } from '@synthetixio/wei';
import Connector from '@/containers/connector';
import { safeWei } from '@/utils/wei';
import { useRouter } from 'next/router';
import { ActionProps } from './type';

const Repay = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}: ActionProps) => {
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();
  const { walletAddress } = Connector.useContainer();
  const valueWei = safeWei(value);
  const repayTxn = useSynthetixTxn(
    `CollateralEth`,
    `repay`,
    [walletAddress, Number(loan.id), valueWei.toBN()],
    gasPrice,
    {
      enabled: valueWei.gt(0),
      onSuccess: () => {
        router.push(`/position`);
      },
      onError: () => {
        console.error(`Something went wrong when repay the loan`);
      },
    },
  );

  const repay = async () => {
    repayTxn.mutate();
  };

  let errorMsg = repayTxn.errorMessage;

  if (valueWei.gt(loan.amount)) {
    errorMsg = `consider closing the loan instead of full repayment`;
  }

  return (
    <>
      <ActionPanel
        errorMsg={errorMsg}
        value={value}
        onGasChange={onGasChange}
        onChange={onChange}
        tokenList={[]}
        activeToken={activeToken}
        cRatio={wei(loan.cratio)}
        newCRatio={newCRatio}
        optimismLayerOneFee={repayTxn.optimismLayerOneFee}
      />
      <ActionButton onClick={repay} msg={actionLabel} disabled={!!errorMsg} />
    </>
  );
};

export default Repay;
