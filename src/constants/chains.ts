import {
  NetworkId,
  NetworkNameById,
  NetworkName,
} from '@synthetixio/contracts-interface';
import { getInfuraRpcURL } from '@/utils/infura';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { NetworkLabel } from '@/constants/network';

type Token = 'ETH';

const NetworkLabelById: Record<1 | 10, NetworkLabel> = {
  1: `Ethereum`,
  10: `Optimism`,
};

export interface Chain {
  id: NetworkId;
  token: Token;
  name: NetworkName;
  label: NetworkLabel;
  rpcUrl: string;
}

export const Ethereum: Chain = {
  id: NetworkIdByName.mainnet,
  token: `ETH`,
  name: NetworkNameById[10],
  label: NetworkLabelById[1],
  rpcUrl: getInfuraRpcURL(NetworkIdByName.mainnet),
};

export const Optimism: Chain = {
  id: NetworkIdByName[`mainnet-ovm`],
  token: `ETH`,
  name: NetworkNameById[10],
  label: NetworkLabelById[10],
  rpcUrl: getInfuraRpcURL(NetworkIdByName[`mainnet-ovm`]),
};

export const SupportedChains: Chain[] = [Ethereum, Optimism];
