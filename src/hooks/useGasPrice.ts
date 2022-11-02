import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import { gasSpeedState } from '@/store/wallet';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

function useGasPrice(): GasPrice | undefined {
  const [gasSpeed] = useRecoilState(gasSpeedState);
  const [gasPriceForTransaction, setGasPriceForTransaction] = useState<
    GasPrice | undefined
  >();

  const { useEthGasPriceQuery } = useSynthetixQueries();
  const gasPriceQuery = useEthGasPriceQuery();
  const gasPrice =
    gasPriceQuery.data != null ? gasPriceQuery.data[gasSpeed] : null;

  useEffect(() => {
    if (gasPrice) {
      const result =
        `gasPrice` in gasPrice
          ? { gasPrice: gasPrice.gasPrice }
          : {
              maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
              maxFeePerGas: gasPrice.maxFeePerGas,
            };
      setGasPriceForTransaction(result);
    }
  }, [gasPrice]);

  return gasPriceForTransaction;
}

export default useGasPrice;
