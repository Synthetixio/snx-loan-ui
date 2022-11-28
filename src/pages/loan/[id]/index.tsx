import styled from "styled-components";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Head from "next/head";
import { Title, Text } from "@/components/Base/Text";
import {
  Flex,
  FlexCol,
  FlexCenter,
  FlexRowCentered,
} from "@/components/Base/Div";
import {
  DualCurrencyIcon,
  CurrencyIcon,
} from "@/components/Currency/CurrencyIcon";
import { BaseCard } from "@/components/Base/Card";
import { InfoTooltip } from "@/components/Tooltip";
import ActionCard from "@/section/Positions/ActionCard";
import { formatPercent, formatString } from "@/utils/formatters/number";
import { useRecoilState } from "recoil";
import { loanState } from "@/store/loan";
import useLiquidationPrice from "@/hooks/useLiquidationPrice";

const Cell = ({
  width = `100%`,
  title,
  content,
  toolTipContent,
  html,
}: {
  width?: string;
  title: string;
  content?: string;
  toolTipContent?: string;
  html?: JSX.Element;
}) => {
  return (
    <Col width={width}>
      <FlexCenter gap={5}>
        <Text size={12} color="#9999AC">
          {title}
        </Text>
        {toolTipContent && <InfoTooltip content={toolTipContent} />}
      </FlexCenter>
      {html ? (
        <FlexCenter gap={8}>{html}</FlexCenter>
      ) : (
        <Text size={20} color="white" fontWeight={700}>
          {content}
        </Text>
      )}
    </Col>
  );
};

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [loan] = useRecoilState(loanState);
  const { ethPrice, liquidationPrice } = useLiquidationPrice(loan);
  if (!loan) {
    // router.push('/position')
    return <>Loan Wasnt found, Return the index page</>;
  }

  return (
    <>
      <Head>
        <title>Loan #{id}</title>
      </Head>
      <Layout>
        <Header>
          <DualCurrencyIcon
            sizes={40}
            leftCurrencyKey={loan?.currency}
            rightCurrencyKey="ETH"
          />
          <Title> Loan #{id}</Title>
        </Header>
        <Flex gap={24}>
          <FlexCol gap={19}>
            <LoanDetail>
              <Row>
                <Cell
                  width="50%"
                  title="Loan"
                  html={
                    <>
                      <CurrencyIcon currencyKey={loan?.currency} sizes={24} />
                      <Text size={20} color="white">
                        {formatString(loan?.amount)} {loan?.currency}
                      </Text>
                    </>
                  }
                />
                <Cell
                  width="50%"
                  title="Collateral"
                  html={
                    <>
                      <CurrencyIcon currencyKey="ETH" sizes={24} />
                      <Text size={20} color="white">
                        {formatString(loan?.collateral)} ETH
                      </Text>
                    </>
                  }
                />
              </Row>
              <Line />
              <Row>
                <Cell
                  title="C-Ratio"
                  toolTipContent="hello world"
                  html={
                    <FlexRowCentered gap={5}>
                      <Text size={20} color="white">
                        {formatPercent(loan.cratio)}
                      </Text>
                      <CRatioSign>Good</CRatioSign>
                    </FlexRowCentered>
                  }
                />
              </Row>
              <Line />
              <Row>
                <Cell
                  width="33.3%"
                  title="ETH Price"
                  content={`$ ${ethPrice.toString(2)}`}
                />
                <Cell
                  width="33.3%"
                  title="Liquidation Price"
                  content={`$ ${liquidationPrice.toString(2)}`}
                />
                <Cell
                  width="33.3%"
                  title="Interest Rate"
                  content="0.25%"
                />
              </Row>
            </LoanDetail>
          </FlexCol>
          <ActionCard loan={loan} />
        </Flex>
      </Layout>
    </>
  );
}

const Header = styled(Flex)`
  gap: 14px;
`;

const LoanDetail = styled(BaseCard)`
  width: 553px;
  padding: 20px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  height: 1px;
  background-color: rgba(130, 130, 149, 0.3);
`;

const Row = styled(Flex)`
  height: 45px;
  align-items: center;
`;

const Col = styled(FlexCol)<{ width?: string }>`
  width: ${({ width }) => width || `100%`};
  gap: 5px;
`;

const CRatioSign = styled(FlexRowCentered)`
  font-size: 12px;
  color: #000000;
  padding: 0 8px;
  background-color: #34edb3;
  border-radius: 4px;
  height: 16px;
`;
