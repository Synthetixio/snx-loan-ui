import type { useActionReturn } from '@/hooks/useAction';
import type { ActionPanelProps } from '@/components/ActionPanel';
import type { Loan } from '@/containers/Loans/types';
import type Wei from '@synthetixio/wei';
import type { GasPrice } from '@synthetixio/queries';

export interface ActionProps
  extends Pick<useActionReturn, 'actionLabel' | 'activeToken'>,
    ActionPanelProps {
  loan: Loan;
  newCRatio: Wei;
  value: string;
  gasPrice: GasPrice;
}
