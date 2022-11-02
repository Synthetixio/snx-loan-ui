import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Connector from '@/containers/connector';
import Loans from '@/containers/Loans';
import SynthetixProvider from '@/containers/Synthetix';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@/styles/globals.css';
import { DEFAULT_REQUEST_REFRESH_INTERVAL } from '@/constants/defaults';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: DEFAULT_REQUEST_REFRESH_INTERVAL,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        {/* @ts-ignore */}
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <Connector.Provider>
            <SynthetixProvider>
              <Loans.Provider>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </Loans.Provider>
            </SynthetixProvider>
          </Connector.Provider>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
