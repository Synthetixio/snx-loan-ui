import styled from 'styled-components';
import { Text12, Text, SubText } from '@/components/Base/Text';
import { FlexRowCentered, FlexCol } from '@/components/Base/Div';
import Table from '@/components/Table/ReactTable';
import Link from 'next/link';
import Loans from '@/containers/Loans';
import Wei, { wei } from '@synthetixio/wei';
import { formatPercent } from '@/utils/formatters/number';
import LoanCell from './LoanCell';
import { loanState } from '@/store/loan';
import { useRecoilState } from 'recoil';
import { Loan } from '@/containers/Loans/types';

const HeaderText = styled(Text12)`
  color: ${({ theme }) => theme.colors.gray700};
  margin-right: 10.81px;
`;

const InterestRate = styled(FlexRowCentered)`
  width: 100%;
`;

const AmountCell = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <FlexCol>
      <Text size={14}>{title}</Text>
      <SubText>{subtitle}</SubText>
    </FlexCol>
  );
};

const PositionTable = (): JSX.Element => {
  const { loans } = Loans.useContainer();
  const [_, setLoan] = useRecoilState(loanState);

  const columns = [
    {
      accessor: `loan`,
      Cell: (props: any) => (
        <LoanCell
          id={props.row.original.id}
          debtToken={props.row.original.currency}
          collateralToken={`ETH`}
        />
      ),
      Header: <HeaderText>Loan</HeaderText>,
      width: 126,
      sortable: true,
    },
    {
      accessor: `amount`,
      Cell: ({ row }: any) => {
        const { amount, collateral, currency } = row.original;
        return (
          <AmountCell
            title={`${wei(amount).toString(2)} ${currency}`}
            subtitle={`Collateral: ${wei(collateral).toString(2)} ETH`}
          />
        );
      },
      Header: <HeaderText>Amount</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      accessor: `cRatio`,
      Cell: (props: any) => (
        <Text size={14}>{formatPercent(props.row.original.cratio)}</Text>
      ),
      Header: <HeaderText>C-Ratio</HeaderText>,
      width: 102,
      sortable: true,
    },
    {
      accessor: `liquidationPrice`,
      Cell: ({ row }: any) =>
        row.original.currency === `sETH` ? (
          <Text size={14}>N/A</Text>
        ) : (
          <Liquidation
            minCRatio={row.original.minCratio}
            debtAmount={row.original.amount}
          />
        ),
      Header: <HeaderText>Liquidation Price</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      Cell: (props: any) => (
        <InterestRate>
          {formatPercent(props.row.original.interestIndex)}
          <ManageButton onClick={() => setLoan(props.row.original as Loan)}>
            <Link href={`/loan/${props.row.original.id}`}>Manage</Link>
          </ManageButton>
        </InterestRate>
      ),
      accessor: `interestRate`,
      Header: <HeaderText>Interest Rate</HeaderText>,
      sortable: true,
      width: 245,
    },
  ];

  return (
    <Container>
      <Table
        noResultsMessage={<NoResult>You have no active loans.</NoResult>}
        columns={columns}
        data={loans}
      />
    </Container>
  );
};

export default PositionTable;

const NoResult = styled(FlexRowCentered)`
  padding: 20px 0;
  align-items: center;
  justify-content: center;
`;

const ManageButton = styled.button`
  background: ${({ theme }) => theme.colors.greenCyan};
  width: 80px;
  height: 36px;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  border: 1px solid #000000;
  cursor: pointer;
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 6px;
`;

type LiquidationProps = {
  minCRatio: Wei;
  debtAmount: Wei;
};

const Liquidation = ({ minCRatio, debtAmount }: LiquidationProps) => {
  const liquidationPrice = wei(debtAmount).mul(minCRatio).toString(2);
  return (
    <AmountCell title={`$ ${liquidationPrice}`} subtitle={`ETH Price: $4200`} />
  );
};
