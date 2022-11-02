import Head from 'next/head';
import Layout from '@/components/layout';
import { Text30 } from '@/components/Base/Text';
import MainCard from '@/section/Borrow/MainCard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Synthetic Loans</title>
        <meta name="description" content="Borrow Synths using other assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Text30>Borrow</Text30>
        <MainCard />
      </Layout>
    </div>
  );
}
