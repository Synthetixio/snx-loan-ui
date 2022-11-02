import { wei } from '@synthetixio/wei';
import { BigNumber, ethers } from 'ethers';
import { NetworkId, NetworkName } from '@synthetixio/contracts-interface';
export type NetworkLabel = `Ethereum` | `Optimism`;

export const TokenAllowanceLimit = wei(ethers.constants.MaxUint256);
export enum Transaction {
  PRESUBMIT = `PRESUBMIT`,
  WAITING = `WAITING`,
  FAILED = `FAILED`,
  SUCCESS = `SUCCESS`,
}

export type Network = {
  id: NetworkId;
  name: NetworkName | `Unsupported`;
  useOvm?: boolean;
  label: NetworkLabel;
};

export const NetworkLabelById: Record<1 | 10, NetworkLabel> = {
  1: `Ethereum`,
  10: `Optimism`,
};
export type GasLimitEstimate = BigNumber | null;
