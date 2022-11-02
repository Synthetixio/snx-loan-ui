import { atom } from 'recoil';

import { DEFAULT_PRICE_CURRENCY } from '@/constants/defaults';
import { Synths } from '@/constants/currency';

import { getAppKey } from '../utils';

import { priceCurrencyStateKey } from './constants';
import { Synth } from '@synthetixio/contracts-interface';

export const PRICE_CURRENCIES = [
  Synths.sUSD,
  Synths.sEUR,
  Synths.sCHF,
  Synths.sAUD,
  Synths.sJPY,
  Synths.sGBP,
  Synths.sBTC,
  Synths.sETH,
];

export const appReadyState = atom<boolean>({
  key: getAppKey(`appReady`),
  default: false,
});

export const priceCurrencyState = atom<Synth>({
  key: priceCurrencyStateKey,
  default: DEFAULT_PRICE_CURRENCY,
});
