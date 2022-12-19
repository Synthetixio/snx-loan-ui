import { ExternalLink as LinkIcon,} from 'react-feather';
import Link from 'next/link'
import ReactGA from 'react-ga4';
import styled from 'styled-components';
import { FC, HTMLProps } from 'react';

import { SupportedChains } from '@/constants/chains';
import { anonymizeLink } from './utils';
import {useRecoilState} from 'recoil';
import { networkState } from '@/store/wallet'

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget;

  const anonymizedHref = anonymizeLink(href);

  // don't prevent default, don't redirect if it's a new tab
  if (target === `_blank` || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      console.debug(`Fired outbound link event`, anonymizedHref);
    });
  } else {
    event.preventDefault();
    // send a ReactGA event and then trigger a location change
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref;
    });
  }
}

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
  }

  :active {
    text-decoration: none;
  }
`;

export function ExternalLink({
  target = `_blank`,
  href,
  rel = `noopener noreferrer`,
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
  href: string;
}) {
  return (
    <StyledLink
      target={target}
      rel={rel}
      href={href}
      onClick={handleClickExternalLink}
      {...rest}
    />
  );
}

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  align-items: center;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

type ExplorerProps = {
  chainId: number;
  ENSName: string;
};

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChains[0].id]: `https://etherscan.io`,
  [SupportedChains[1].id]: `https://optimistic.etherscan.io`,
};

function getExplorerLink(chainId: number, data: string): string {
  const prefix = ETHERSCAN_PREFIXES[chainId] ?? `https://etherscan.io`;
  return `${prefix}/address/${data}`;
}

export const Explorer: FC<ExplorerProps> = ({ chainId, ENSName }) => {
  return (
    <AddressLink
      hasENS={!!ENSName}
      isENS={true}
      href={getExplorerLink(chainId, ENSName)}
    >
      <LinkIcon size={16} />
      <span style={{ marginLeft: `4px` }}>View on Explorer</span>
    </AddressLink>
  );
};

type TxExplorerProps = {
  txHash: string,
  label?: string,
  children?: JSX.Element,
}

export const TxExplorer: FC<TxExplorerProps> = ({ txHash, children}) => {
  const [ network ] = useRecoilState(networkState)
  
  const href = `${ETHERSCAN_PREFIXES[network.id]}/tx/${txHash}`

  return <ExternalLink href={href}>{children}</ExternalLink>
}

export default Explorer;
