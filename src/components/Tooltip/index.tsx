import styled from 'styled-components';
import InfoCircle from '@/assets/svg/info-circle.svg';
import Image from 'next/image';
import { Tooltip } from 'react-tippy';

const TooltipContent = styled.div`
  text-align: center;
  background: #424251;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    top: 72%;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: #424251 transparent transparent transparent;
  }
`;

type InfoTooltipType = {
  content: string;
};

export const InfoTooltip = (props: InfoTooltipType) => {
  const { content } = props;
  return (
    // @ts-ignore
    <Tooltip
      html={<TooltipContent>{content}</TooltipContent>}
      position="top"
      trigger="mouseenter"
      arrow={true}
    >
      <Image src={InfoCircle} alt="info-circle" width="10" height="10px" />
    </Tooltip>
  );
};

export default InfoTooltip;
