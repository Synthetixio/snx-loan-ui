import { wei } from '@synthetixio/wei';
import { useRouter } from 'next/router';
import Loans from '@/containers/Loans';
import useSynthetixQueries from '@synthetixio/queries';
import { ActionProps } from './type';

import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';

const Withdraw: React.FC<ActionProps> = ({
  loan,
  newCRatio,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}) => {
  const { reloadPendingWithdrawals } = Loans.useContainer();
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();

  const closeTxn = useSynthetixTxn(
    `CollateralEth`,
    `close`,
    [Number(loan.id)],
    gasPrice,
    {
      onSuccess: async () => {
        await reloadPendingWithdrawals();
        router.push(`/positions`);
      },
      enabled: true,
    },
  );

  const close = async () => {
    closeTxn.mutate();
  };

  return (
    <>
      <ActionPanel
        {...{
          disableInput: true,
          errorMsg: closeTxn.errorMessage,
          tokenList: [],
          onChange,
          value: wei(loan.amount).toString(1),
          onGasChange,
          activeToken,
          cRatio: wei(loan.cratio),
          newCRatio,
          optimismLayerOneFee: closeTxn.optimismLayerOneFee,
        }}
      />
      <ActionButton
        onClick={close}
        msg={actionLabel}
        disabled={!!closeTxn.errorMessage}
      />
    </>
  );
};

export default Withdraw;
