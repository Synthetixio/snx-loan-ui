import { ethers } from 'ethers';
import Connector from '@/containers/connector';
import { useState, useEffect } from 'react';
import { wei } from '@synthetixio/wei';
import { Synths } from '@/constants/currency';
import { useMemo } from 'react';

const useStats = () => {
  const { provider, synthetixjs } = Connector.useContainer();

  const [borrows, setBorrows] = useState<Array<any>>([]);
  const borrowsOpenInterestUSD = useMemo(
    () => borrows.reduce((sum, stat) => sum.add(stat.openInterestUSD), wei(0)),
    [borrows],
  );

  useEffect(() => {
    let isMounted = true;
    const unsubs: Array<() => any> = [() => (isMounted = false)];

    if (provider && synthetixjs) {
      const {
        contracts: {
          ExchangeRates: exchangeRatesContract,
          CollateralManager: collateralManagerContract,
        },
      } = synthetixjs;

      const getBorrowStats = async (currency: string) => {
        const [openInterest, [assetUSDPrice]] = await Promise.all([
          collateralManagerContract.long(
            ethers.utils.formatBytes32String(currency),
          ),
          exchangeRatesContract.rateAndInvalid(
            ethers.utils.formatBytes32String(currency),
          ),
        ]);
        const openInterestUSD = wei(openInterest).mul(wei(assetUSDPrice));

        return {
          currency,
          openInterest: wei(openInterest),
          openInterestUSD: openInterestUSD,
        };
      };

      const loadBorrowsStats = () =>
        Promise.all(
          [Synths.sBTC, Synths.sETH, Synths.sUSD].map(getBorrowStats),
        );

      const load = async () => {
        try {
          const borrows = await loadBorrowsStats();
          if (isMounted) {
            setBorrows(borrows);
          }
        } catch (e) {
          console.error(e);
        }
      };

      const subscribe = () => {
        const newBlockEvent = `block`;
        provider!.on(newBlockEvent, load);
        unsubs.push(() => provider!.off(newBlockEvent, load));
      };

      load();
      subscribe();
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [provider, synthetixjs]);

  return { borrows, borrowsOpenInterestUSD };
};

export default useStats;
