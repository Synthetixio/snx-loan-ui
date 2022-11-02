import styled from 'styled-components';
import { BaseCard } from '@/components/Base/Card';
import { Text } from '@/components/Base/Text';
import { DefaultDropdownMenu } from '@/components/Dropdown';
import { ChevronDown } from 'react-feather';
import { FlexRowCentered, FlexCenter } from '@/components/Base/Div';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loanState } from '@/store/loan';
import { GasPrice } from '@synthetixio/queries';
import useSynthetixQueries from '@synthetixio/queries';
import { wei } from '@synthetixio/wei';
import { calculateLoanCRatio } from '@/components/ActionPanel/utils';
import useAction from '@/hooks/useAction';

import Repay from './ModifyLoans/Repay';
import Draw from './ModifyLoans/Draw';
import Deposit from './ModifyLoans/Deposit';
import Withdraw from './ModifyLoans/Withdraw';
import Close from './ModifyLoans/Close';
import { Loan } from '@/containers/Loans/types';

const ActionCard = ({ loan }: { loan: Loan}) => {
  const actions = [`draw`, `repay`, `deposit`, `withdraw`, `close`];
  const [action, setAction] = useState<string>(``);
  const [value, setValue] = useState<string>(``);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>();
  const { useExchangeRatesQuery } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const {
    loan: newLoan,
    collateral: newCollateral,
    activeToken,
    actionLabel,
  } = useAction({
    action,
    value,
    loan: { amount: loan.amount, asset: loan.currency },
    collateral: { amount: loan.collateral, asset: `ETH` },
  });

  const newCRatio = value
    ? calculateLoanCRatio(exchangeRates, newCollateral, newLoan)
    : wei(0);

  useEffect(() => {
    setValue(``);
  }, [action]);

  const Actions: Record<string, any> = {
    repay: Repay,
    draw: Draw,
    deposit: Deposit,
    withdraw: Withdraw,
    close: Close,
  };
  const Action = Actions[action];

  return (
    <Container>
      <Text size={20} fontWeight={700}>
        What do you want to do
      </Text>
      <DefaultDropdownMenu
        className="dropdown"
        trigger={
          <Select>
            <span>{action || `Select an action`}</span>
            <ChevronDown size={14} />
          </Select>
        }
        offset={55}
        dropdownCls="dropdownContainer"
        dropList={
          <DropdownList>
            {actions.map((action) => (
              <Option key={action} onClick={() => setAction(action)}>
                <Text size={18}>{action}</Text>
              </Option>
            ))}
          </DropdownList>
        }
      />
      {action && (
        <>
          <SubHeader gap={5}>
            <Text fontWeight={700}>{action}</Text>
          </SubHeader>
          <Action
            {...{
              onChange: setValue,
              loan,
              newCRatio,
              activeToken,
              actionLabel,
              value,
              gasPrice,
              onGasChange: setGasPrice,
            }}
          />
        </>
      )}
    </Container>
  );
};

const Select = styled(FlexRowCentered)`
  border: 1px solid #424251;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: normal;
  cursor: pointer;
  text-transform: capitalize;
`;

const Option = styled.div`
  padding: 10px 16px;
  text-transform: capitalize;

  &:hover {
    background: ${({ theme }) => theme.colors.bgWhiteAlpha};
  }
  cursor: pointer;
  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const Container = styled(BaseCard)`
  padding: 10px;
  min-width: 553px;
  height: 100%;
  .dropdown {
    margin-top: 10px;
  }
  .dropdownContainer {
    width: 100%;
  }
`;

const DropdownList = styled(BaseCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled(FlexCenter)`
  margin-top: 21px;
`;

export default ActionCard;
