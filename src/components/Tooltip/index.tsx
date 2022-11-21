import styled from "styled-components";
import InfoCircle from "@/assets/svg/info-circle.svg";
import Image from "next/image";
import ReactTooltip from "react-tooltip";

const TooltipContainer = styled.div`
  .float-content {
    width: 320px;
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
`;

type InfoTooltipType = {
  content: string;
  id?: string;
};

export const InfoTooltip = (props: InfoTooltipType) => {
  const { content, id = "tool-tip" } = props;
  console.log(content);
  return (
    <TooltipContainer>
      <Image
        data-tip={content}
        data-for={id}
        src={InfoCircle}
        alt="info-circle"
        width="10"
        height="10px"
      />
      <ReactTooltip
        backgroundColor="#424251"
        id={id}
        effect="solid"
        type="info"
        className="float-content"
      />
    </TooltipContainer>
  );
};

export default InfoTooltip;
