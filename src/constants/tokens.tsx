import { ethers } from 'ethers';
import { StaticImageData } from 'next/image';
import WETHLogo from '@/assets/png/weth.png';
import sUSDLogo from '@/assets/png/sUSD.png';
import sETHLogo from '@/assets/png/seth.png';
import ETHLogo from '@/assets/png/currencies/eth.png';

export type CurrencyKey = string;
export type TokenAddress = string;

export const sETH_ADDRESS = `0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb`;
export const LUSD_ADDRESS = `0x5f98805a4e8be255a32880fdec7f6728c6568ba0`;
export const sUSD_ADDRESS = `0x57ab1ec28d129707052df4df418d58a2d46d5f51`;
export const WETH_ADDRESS = `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`;

const OVM_ADDRESS = {
  WETH: `0x4200000000000000000000000000000000000006`,
  LUSD: `0xc40f949f8a4e094d1b49a23ea9241d289b7b2819`,
  sUSD: `0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9`,
  sETH: `0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49`,
};

export enum Tokens {
  sETH = `sETH`,
  LUSD = `LUSD`,
  ETH = `ETH`,
  sUSD = `sUSD`,
  WETH = `WETH`,
}

export type TokenKey = 'seth' | 'lusd' | 'eth' | 'susd';

export interface TokenInterface {
  name: string;
  key: string;
  address: TokenAddress;
  src: StaticImageData;
  decimals: number;
  precision: number;
  ovmAddress: TokenAddress;
}

export const sETH: TokenInterface = {
  name: `sETH`,
  key: `seth`,
  address: sETH_ADDRESS,
  src: sETHLogo,
  decimals: 18,
  precision: 4,
  ovmAddress: OVM_ADDRESS[Tokens.sETH],
};

export const ETH: TokenInterface = {
  name: `ETH`,
  key: `eth`,
  address: ethers.constants.AddressZero,
  src: ETHLogo,
  decimals: 18,
  precision: 4,
  ovmAddress: ethers.constants.AddressZero,
};

export const WETH: TokenInterface = {
  name: `WETH`,
  key: `weth`,
  address: WETH_ADDRESS,
  src: WETHLogo,
  decimals: 18,
  precision: 4,
  ovmAddress: OVM_ADDRESS[Tokens.WETH],
};

export const sUSD: TokenInterface = {
  name: `sUSD`,
  key: `susd`,
  address: sUSD_ADDRESS,
  src: sUSDLogo,
  decimals: 18,
  precision: 2,
  ovmAddress: OVM_ADDRESS[Tokens.sUSD],
};
