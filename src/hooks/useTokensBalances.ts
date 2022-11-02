import { wei, Wei } from '@synthetixio/wei';
import useSynthetixQueries from '@synthetixio/queries';
import Connector from '@/containers/connector';
import { getETHToken } from '@/contracts/ethToken';

function useTokensBalances(): Wei {
  const { walletAddress, network } = Connector.useContainer();
  const { useTokensBalancesQuery } = useSynthetixQueries();
  const balances = useTokensBalancesQuery(
    [getETHToken(network)],
    walletAddress,
  );
  const collateralBalance = balances.data?.ETH?.balance || wei(0);
  return collateralBalance;
}

export default useTokensBalances;
