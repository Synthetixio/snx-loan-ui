import styled from 'styled-components';
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import { Title } from '@/components/Base/Text';
import { FlexCol, FlexRow } from '@/components/Base/Div';
import PositionTable from '@/section/Positions/PositionTable';
import LoanHistory from '@/section/Positions/LoanHistory';
import PendingWithdrawals from '@/section/Positions/PendingWithdrawals';

const PositionPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Position</title>
      </Head>
      <Layout>
        <Title>Position</Title>
        <Container>
          <LeftPanel>
            <PositionTable />
            <LoanHistory />
          </LeftPanel>
          <RightPanel>
            <PendingWithdrawals />
          </RightPanel>
        </Container>
      </Layout>
    </>
  );
};

export default PositionPage;

const LeftPanel = styled(FlexCol)`
  width: 784px;
  gap: 21px;
`;
const RightPanel = styled.div`
  width: 322px;
`;
const Container = styled(FlexRow)`
  .table-header {
    height: 40px;
  }
`;
