import styled from 'styled-components';
import { BaseCard } from '@/components/Base/Card';
import Table from '@/components/Table/ReactTable';
import { Text12, Text, Text18 } from '@/components/Base/Text';
import { CurrencyIcon } from '@/components/Currency/CurrencyIcon';
import { FlexRow, Flex, FlexCol } from '@/components/Base/Div';
import useStats from './useStats';
import { formatDollar, formatCurrency } from '@/utils/string';
import { NAMES } from './constants';

const OpenInterestTable = () => {
  const { borrows, borrowsOpenInterestUSD } = useStats();

  const columns = [
    {
      accessor: `key`,
      Cell: ({ row }: any) => (
        <AssetCell>
          <CurrencyIcon currencyKey={row.original.currency} sizes={40} />
          <div>
            <Text size={14}>{row.original.currency}</Text>
            <Text color="#9999AC">{NAMES[row.original.currency]}</Text>
          </div>
        </AssetCell>
      ),
      Header: <HeaderText>Assets</HeaderText>,
      sortable: true,
      width: 278,
    },
    {
      Cell: ({ row }: any) => (
        <AmountCell>
          <Text size={14}>
            {formatCurrency(row.original.openInterest.toString(2), 2)}
          </Text>
          <Text size={12} color="#9999AC">
            {formatCurrency(row.original.openInterestUSD.toString(2), 2)}
          </Text>
        </AmountCell>
      ),
      accessor: `size`,
      Header: <HeaderText>Interest Rate</HeaderText>,
      sortable: true,
    },
  ];

  return (
    <Container>
      <Title>Open Interest</Title>
      <Table columns={columns} data={borrows} headerHeight={40} />
      <Total>
        <Text18>Total</Text18>
        <Text18>{formatDollar(borrowsOpenInterestUSD.toString(2))}</Text18>
      </Total>
    </Container>
  );
};

const Container = styled(BaseCard)`
  width: 438px;
  .react-table {
    border: unset;
    border-radius: unset;
    border-bottom: 1px solid #575768;
    .table-body-row span {
      text-transform: unset;
    }
  }
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  padding: 0 20px;
  padding-top: 20px;
  height: 44px;
`;

const AmountCell = styled(FlexCol)`
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  padding-right: 16px;
`;

const AssetCell = styled(Flex)`
  gap: 8px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Total = styled(FlexRow)`
  height: 72px;
  padding: 22px 24px;
`;

const HeaderText = styled(Text12)`
  color: ${({ theme }) => theme.colors.gray700};
  margin-right: 10.81px;
`;

export default OpenInterestTable;
