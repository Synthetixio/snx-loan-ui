import Connector from '@/containers/connector';
import { isSupportedNetworkId } from '@/utils/network';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import {
  SynthetixQueryContextProvider,
  createQueryContext,
} from '@synthetixio/queries';

const SynthetixProvider = ({ children }: { children: JSX.Element }) => {
  const { provider, signer, network, synthetixjs, L2DefaultProvider } =
    Connector.useContainer();

  const networkId = network?.id ? Number(network.id) : -1;
  const value =
    provider && isSupportedNetworkId(networkId) && synthetixjs
      ? createQueryContext({
          provider,
          signer: signer || undefined,
          networkId,
          synthetixjs,
        })
      : createQueryContext({
          networkId: NetworkIdByName[`mainnet-ovm`],
          provider: L2DefaultProvider,
          synthetixjs: null,
        });

  return (
    <>
      <SynthetixQueryContextProvider value={value}>
        {children}
      </SynthetixQueryContextProvider>
    </>
  );
};

export default SynthetixProvider;
