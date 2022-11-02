import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import { Title, Text, Text12 } from '@/components/Base/Text';
import { FlexCol, Flex, FlexRow } from '@/components/Base/Div';
import PositionTable from '@/section/Positions/PositionTable';
import { BaseCard } from '@/components/Base/Card';
import Wallet from '@/assets/png/stats/wallet.png';
import Percent from '@/assets/png/stats/percent.png';
import Chart from '@/assets/png/stats/chart.png';
import Clock from '@/assets/png/stats/clock.png';
import Earn from '@/assets/png/stats/earn2.png';
import OpenInterestTable from '@/section/Stats/OpenInterestTable';

const PositionPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Stats</title>
      </Head>
      <Layout>
        <Title>Stats</Title>
        <Container gap={24}>
          <LeftPanel>
            <Flex gap={16}>
              <StatCard
                width="33.3%"
                src={Wallet}
                title="Total Active Loans"
                subtitle="5"
              />
              <StatCard
                width="33.3%"
                src={Earn}
                title="Active Loan(s) Total"
                subtitle="5"
              />
              <StatCard
                width="33.3%"
                src={Clock}
                title="Total Loans to Date"
                subtitle="5"
              />
            </Flex>
            <Flex gap={16}>
              <StatCard
                width="50%"
                src={Percent}
                title="Total Loans to Date"
                subtitle="5"
              />
              <StatCard
                width="50%"
                src={Chart}
                title="Total Loans to Date"
                subtitle="5"
              />
            </Flex>
          </LeftPanel>
          <RightPanel>
            <OpenInterestTable />
          </RightPanel>
        </Container>
      </Layout>
    </>
  );
};

export default PositionPage;

const LeftPanel = styled(FlexCol)`
  min-width: 668px;
  gap: 21px;
`;
const RightPanel = styled.div`
  width: 322px;
`;
const Container = styled(Flex)``;

const StatCard = ({
  width,
  src,
  title,
  subtitle,
}: {
  width: string;
  src: StaticImageData;
  title: string;
  subtitle: string;
}) => {
  return (
    <StatsCard width={width}>
      <div>
        <Image src={src} alt="image" />
      </div>
      <Text12>{title}</Text12>
      <Text lineHeight="150%" size={20} color="rgba(255, 255, 255, 0.64)">
        {subtitle}
      </Text>
    </StatsCard>
  );
};

const StatsCard = styled(BaseCard)<{ width: string }>`
  width: ${({ width }) => width};
  height: 165px;
  padding: 28.15px 21.75px;
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 35.85px;
  }
`;
