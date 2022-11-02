import styled from 'styled-components';
import Slider from 'rc-slider';
import { useState } from 'react';

const StyledContainer = styled.div`
  .rc-slider {
    position: relative;
  }
  .rc-slider-rail {
    height: 6px;
    background: #424251;
    border-radius: 2px;
  }
  .rc-slider-handle {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.white};
    margin-top: -11px;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
  }
  .rc-slider-track {
    background: ${({ theme }) => theme.colors.bgCyan};
    height: 6px;
    border-radius: 2px;
    margin-top: -6px;
  }
`;

const RatioSlider = () => {
  const [value, setValue] = useState(0);
  return (
    <StyledContainer>
      <Slider
        min={0}
        max={1}
        defaultValue={0.81}
        step={0.01}
        // onChange={(nextValue) => setValue(nextValue)}
      />
    </StyledContainer>
  );
};

export default RatioSlider;
