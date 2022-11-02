import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import SvgLogo from '@/assets/svg/synthetix.svg';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { FlexRowCentered, Flex } from '@/components/Base/Div';
import { Text16 } from '@/components/Base/Text';
import NetworkSelector from '@/components/NetworkSelector';
import Wallet from '@/components/Wallet';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

const Header = styled.header`
  padding: 38px 46px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 112px;
`;

const Logo = styled(FlexRowCentered)`
  font-size: 14px;
  font-weight: 400;
  font-family: ${(props) => props.theme.fonts.lustra};
  width: 104px;
  margin-right: 70px;
`;

const Tab = styled(Text16)<{
  selected?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 6px 16px;
  margin-right: 32px;
  height: 36px;
  cursor: pointer;
  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.bgWhiteAlpha};
      border-radius: 9999px;
    `}
`;

const TabBar = styled(Flex)``;
const Right = styled(Flex)`
  gap: 18px;
  .layout-network {
    div {
      width: 160px;
    }
  }
`;

const Main = styled.main`
  padding: 0 155px;
`;

export default function Layout({ children }: LayoutProps) {
  const { asPath } = useRouter();
  const ROUTES = [
    { label: `Borrow`, href: `/`, isActive: false },
    { label: `Positions`, href: `/position`, isActive: false },
    { label: `Stats`, href: `/stats`, isActive: false },
  ];
  return (
    <>
      <Header>
        <Flex>
          <Logo>
            <Image src={SvgLogo} priority={true} alt="svg logo" />
            <span>Loans</span>
          </Logo>
          <TabBar>
            {ROUTES.map((route) => {
              const { href } = route;
              const linkBase = href.split(`/`)[1];
              const isActive = linkBase === asPath.split(`/`)[1];
              return (
                <Tab selected={isActive} key={route.label}>
                  <Link href={route.href}>{route.label}</Link>
                </Tab>
              );
            })}
          </TabBar>
        </Flex>
        <Right>
          <NetworkSelector containerCls="layout-network" />
          <Wallet />
        </Right>
      </Header>
      <Main>{children}</Main>
    </>
  );
}
