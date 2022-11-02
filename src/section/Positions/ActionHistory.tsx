import styled, { css } from 'styled-components';
import { Text12, Text, SubText, Text18 } from '@/components/Base/Text';
import { FlexRowCentered, FlexCol, FlexRow, Flex } from '@/components/Base/Div';
import Table from '@/components/Table/ReactTable';
import { makeActions, Action } from '@/components/Table/makeData';
import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { ChevronDown, ArrowDown, ArrowUp, ArrowRight } from 'react-feather';
import { CellProps } from 'react-table';

const TogglePanel = () => {
  const { value: isActive, toggle } = useBoolean(true);
  return (
    <Container active={isActive}>
      <TitlePanel active={isActive} onClick={() => toggle()}>
        <FlexRowCentered>
          <Text size={20}>Action History</Text>
          <Number>9</Number>
        </FlexRowCentered>
        <ChevronDown size={16} color={`#00D1FF`} className="down-arrow" />
      </TitlePanel>
      <ContentPanel active={isActive}>
        <ActionHistoryTable />
      </ContentPanel>
    </Container>
  );
};

const ActionHistoryTable = () => {
  const [data, setData] = useState(() => makeActions());

  return (
    <Table
      columns={[
        {
          accessor: `type`,
          Cell: (props: any) => {
            return <ActionType type={props.row.original.type} />;
          },
          Header: <HeaderText>Loan</HeaderText>,
          width: 126,
          sortable: true,
        },
        {
          accessor: `amount`,
          Cell: ({ row }: any) => <Text>{row.original.amount}</Text>,
          Header: <HeaderText>Amount</HeaderText>,
          width: 145,
          sortable: true,
        },
        {
          accessor: `date`,
          Cell: (props: any) => (
            <Text size={14}>{props.row.original.date}</Text>
          ),
          Header: <HeaderText>C-Ratio</HeaderText>,
          width: 102,
          sortable: true,
        },
      ]}
      data={data}
    />
  );
};

export default TogglePanel;

const ActionType = ({ type }: { type: string }) => {
  const typeMap: Record<string, string> = {
    deposit: `Deposit Collateral`,
    withdrawal: `Withdraw Collateral`,
    repay: `Repay Loans`,
  };
  const IconMap: Record<string, any> = {
    deposit: ArrowUp,
    withdrawal: ArrowDown,
    repay: ArrowRight,
  };
  const Icon = IconMap[type];

  return (
    <FlexRowCentered gap={11}>
      <Icon sizes={12} color="white" />
      <Text12 fontWeight={600}>{typeMap[type]}</Text12>
    </FlexRowCentered>
  );
};

const HeaderText = styled(Text12)`
  color: ${({ theme }) => theme.colors.gray700};
  margin-right: 10.81px;
`;

const Container = styled(FlexCol)<{ active: boolean }>`
  border: 1px solid #2d2d38;
  background: #0b0b22;
  padding: 0 12px;

  .react-table {
    border: unset;
  }
`;

const TitlePanel = styled(FlexRowCentered)<{ active: boolean }>`
  height: 64px;
  cursor: pointer;
  padding-right: 26.7px;
  .down-arrow {
    ${({ active }) =>
      active
        ? css`
            transform: rotate(180deg);
            transition: transform 0.5s linear;
          `
        : css`
            transform: rotate(0deg);
            transition: transform 0.5s linear;
          `}
  }
`;

const Number = styled.div`
  background: #31d8a4;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  color: #000;
  text-align: center;
`;

const ContentPanel = styled.div<{ active: boolean }>`
  ${({ active }) => !active && `display: none;`}
`;
