import { wei, WeiSource } from '@synthetixio/wei';

export const formatPercent = (
  value: WeiSource,
  options?: { minDecimals: number },
) => {
  const decimals = options?.minDecimals ?? 2;

  return wei(value).mul(100).toString(decimals).concat(`%`);
};

export const formatString = (value: WeiSource, minDecimals = 2) => {
  return wei(value).toString(minDecimals);
};
