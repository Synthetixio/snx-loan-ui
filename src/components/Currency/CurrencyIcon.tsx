import Image from 'next/image';
import styled from 'styled-components';

import AAVEIcon from 'assets/png/currencies/sAAVE.png';
import ADAIcon from 'assets/png/currencies/sADA.png';
import APEIcon from 'assets/png/currencies/sAPECOIN.png';
import AUDIcon from 'assets/png/currencies/sAUD.png';
import AVAXIcon from 'assets/png/currencies/sAVAX.png';
import BNBIcon from 'assets/png/currencies/sBNB.png';
import BTCIcon from 'assets/png/currencies/sBTC.png';
import CHFIcon from 'assets/png/currencies/sCHF.png';
import DEBTIcon from 'assets/png/currencies/sDebt.png';
import DOGEIcon from 'assets/png/currencies/sDOGE.png';
import DOTIcon from 'assets/png/currencies/sDOT.png';
import DYDXIcon from 'assets/png/currencies/sDYDX.png';
import sETHIcon from 'assets/png/currencies/sETH.png';
import ETHIcon from '@/assets/png/currencies/eth.png';
import ETHBTCIcon from 'assets/png/currencies/sETHBTC.png';
import EURIcon from 'assets/png/currencies/sEUR.png';
import GBPIcon from 'assets/png/currencies/sGBP.png';
import INRIcon from 'assets/png/currencies/sINR.png';
import JPYIcon from 'assets/png/currencies/sJPY.png';
import KRWIcon from 'assets/png/currencies/sKRW.png';
import LINKIcon from 'assets/png/currencies/sLINK.png';
import MATICIcon from 'assets/png/currencies/sMATIC.png';
import OILIcon from 'assets/png/currencies/sOIL.png';
import SOLIcon from 'assets/png/currencies/sSOL.png';
import UNIIcon from 'assets/png/currencies/sUNI.png';
import USDIcon from 'assets/png/currencies/sUSD.png';
import XAGIcon from 'assets/png/currencies/sXAG.png';
import XAUIcon from 'assets/png/currencies/sXAU.png';

export type CurrencyIconProps = {
  currencyKey: string;
  type?: 'synth' | 'asset' | 'token';
  className?: string;
  sizes?: number;
  style?: any;
};

const SYNTH_ICONS: Record<string, any> = {
  ETH: ETHIcon,
  sBTC: BTCIcon,
  sETH: sETHIcon,
  sLINK: LINKIcon,
  sSOL: SOLIcon,
  sAVAX: AVAXIcon,
  sAAVE: AAVEIcon,
  sUNI: UNIIcon,
  sMATIC: MATICIcon,
  sXAU: XAUIcon,
  sXAG: XAGIcon,
  sEUR: EURIcon,
  sAPE: APEIcon,
  sDYDX: DYDXIcon,
  sWTI: OILIcon,
  sAXS: null,
  sUSD: USDIcon,
  sINR: INRIcon,
  sJPY: JPYIcon,
  sGBP: GBPIcon,
  sCHF: CHFIcon,
  sKRW: KRWIcon,
  sDOT: DOTIcon,
  sETHBTC: ETHBTCIcon,
  sADA: ADAIcon,
  sAUD: AUDIcon,
  sBNB: BNBIcon,
  sDOGE: DOGEIcon,
  sDebtRatio: DEBTIcon,
};

const CurrencyIcon = ({
  currencyKey,
  sizes,
  className,
  style,
}: CurrencyIconProps): JSX.Element => {
  const props = {
    alt: currencyKey,
    src: SYNTH_ICONS[currencyKey],
    className,
    style,
  };
  const size = `${sizes || 16}px`;

  return <Image {...props} width={size} height={size} alt={currencyKey} />;
};

type DualCurrencyIconType = {
  leftCurrencyKey: string;
  rightCurrencyKey: string;
  sizes: number;
};

const DualCurrencyIcon = ({
  leftCurrencyKey,
  rightCurrencyKey,
  sizes,
}: DualCurrencyIconType) => {
  return (
    <DualCoins>
      <CurrencyIcon
        className="left-coin"
        currencyKey={leftCurrencyKey}
        sizes={sizes}
      />
      <CurrencyIcon
        className="right-coin"
        currencyKey={rightCurrencyKey}
        sizes={sizes}
      />
    </DualCoins>
  );
};

const DualCoins = styled.div`
  span {
    &:first-child {
      z-index: 1;
    }
    &:last-child {
      margin-left: -11px !important;
    }
  }
`;

export { DualCurrencyIcon, CurrencyIcon };
