import styled, { css } from "styled-components";
import { Text12, Text, SubText } from "@/components/Base/Text";
import { FlexRowCentered, FlexCol } from "@/components/Base/Div";
import Table from "@/components/Table/ReactTable";
import { useBoolean } from "usehooks-ts";
import { ChevronDown } from "react-feather";
import Loans from "@/containers/Loans";
import { wei } from "@synthetixio/wei";
import LoanCell from "./LoanCell";

const TogglePanel = () => {
  const { value: isActive, toggle } = useBoolean(false);
  const { closedLoans } = Loans.useContainer();
  return (
    <Container active={isActive}>
      <TitlePanel active={isActive} onClick={() => toggle()}>
        <FlexRowCentered>
          <Text size={20}>Loan History</Text>
          <NumberText>{closedLoans.length}</NumberText>
        </FlexRowCentered>
        <ChevronDown size={16} color={`#00D1FF`} className="down-arrow" />
      </TitlePanel>
      <ContentPanel active={isActive}>
        <PositionTable />
      </ContentPanel>
    </Container>
  );
};

const PositionTable = (): JSX.Element => {
  const { closedLoans } = Loans.useContainer();

  const columns = [
    {
      accessor: `loan`,
      Cell: (props: any) => (
        <LoanCell
          id={String(Number(props.row.original.id))}
          debtToken={props.row.original.currency}
          collateralToken={`ETH`}
        />
      ),
      Header: <HeaderText>Loan</HeaderText>,
      width: 120,
      sortable: true,
    },
    {
      accessor: `amount`,
      Cell: ({ row }: any) => {
        const { amount, collateralAmount, currency } = row.original;
        return (
          <AmountCell
            title={`${wei(amount).toString(2)} ${currency}`}
            subtitle={`Collateral: ${wei(collateralAmount).toString(2)} ETH`}
          />
        );
      },
      Header: <HeaderText>Amount</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      accessor: `cRatio`,
      Cell: (props: any) => <Text size={14}>N/A</Text>,
      Header: <HeaderText>C-Ratio</HeaderText>,
      width: 102,
      sortable: true,
    },
    {
      accessor: `liquidationPrice`,
      Cell: ({ row }: any) => <Text size={14}>N/A</Text>,
      Header: <HeaderText>Liquidation Price</HeaderText>,
      width: 145,
    },
    {
      Cell: (props: any) => (
        <InterestRate>
          0.25%
          <ManageButton disabled={true}>Closed</ManageButton>
        </InterestRate>
      ),
      accessor: `interestRate`,
      Header: <HeaderText>Interest Rate</HeaderText>,
      sortable: true,
      width: 245,
    },
  ];

  return (
    <Table
      pageSize={5}
      showPagination={true}
      columns={columns}
      data={[...closedLoans, ...closedLoans]}
    />
  );
};

export default TogglePanel;

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

const ManageButton = styled.button`
  background: ${({ theme }) => theme.colors.gray900};
  width: 80px;
  height: 36px;
  color: ${({ theme }) => theme.colors.gray600};
  border-radius: 4px;
  border: 1px solid #000000;
`;

const Container = styled(FlexCol)<{ active: boolean }>`
  border: 1px solid #2d2d38;
  background: #0b0b22;
  padding: 0 12px;

  .react-table {
    border: unset;
    min-height: 400px;
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

const NumberText = styled.div`
  background: #31d8a4;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  color: #000;
  text-align: center;
  font-size: 8px;
  font-weight: 700;
  line-height: 18px;
`;

const ContentPanel = styled.div<{ active: boolean }>`
  ${({ active }) => !active && `display: none;`}
`;
