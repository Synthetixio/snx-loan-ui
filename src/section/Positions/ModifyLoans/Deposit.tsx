import { wei } from '@synthetixio/wei';
import { useRouter } from 'next/router';
import Connector from '@/containers/connector';
import useSynthetixQueries from '@synthetixio/queries';
import { ActionProps } from './type';
import { safeWei } from '@/utils/wei';

import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';

const Deposit: React.FC<ActionProps> = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}) => {
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();
  const { walletAddress } = Connector.useContainer();
  const depositAmount = safeWei(value);

  const depositTxn = useSynthetixTxn(
    `CollateralEth`,
    `deposit`,
    [walletAddress, Number(loan.id)],
    { ...gasPrice, value: depositAmount.toBN() },
    {
      enabled: depositAmount.gt(0),
      onSuccess: () => {
        router.push(`/position`);
      },
    },
  );

  const deposit = async () => {
    depositTxn.mutate();
  };

  return (
    <>
      <ActionPanel
        {...{
          errorMsg: depositTxn.errorMessage,
          tokenList: [],
          onChange,
          value,
          onGasChange,
          activeToken,
          cRatio: wei(loan.cratio),
          newCRatio,
          optimismLayerOneFee: depositTxn.optimismLayerOneFee,
        }}
      />
      <ActionButton
        onClick={deposit}
        msg={actionLabel}
        disabled={!!depositTxn.errorMessage}
      />
    </>
  );
};

export default Deposit;
