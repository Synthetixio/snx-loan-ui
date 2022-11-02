import { DualCurrencyIcon } from '@/components/Currency/CurrencyIcon';
import { FlexRowCentered } from '@/components/Base/Div';
import { Text } from '@/components/Base/Text';

type LoanCellProps = {
  id: string;
  collateralToken: string;
  debtToken: string;
};

const LoanCell = ({ id, collateralToken, debtToken }: LoanCellProps) => {
  return (
    <FlexRowCentered gap={7}>
      <DualCurrencyIcon
        leftCurrencyKey={debtToken}
        rightCurrencyKey={collateralToken}
        sizes={22}
      />
      <Text size={14}>{`#${id}`}</Text>
    </FlexRowCentered>
  );
};

export default LoanCell;
