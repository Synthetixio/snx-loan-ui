import React, { ReactElement } from 'react';
import { FC, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useOnClickOutside, useBoolean } from 'usehooks-ts';

type DefaultDropdownMenuProps = {
  trigger: JSX.Element;
  dropList: ReactElement | ReactElement[];
  className?: string;
  triggerCls?: string;
  dropdownCls?: string;
  offset?: number;
  leftOffset?: number | string;
};

const DropdownContainer = styled.div`
  position: relative;
  display: grid;
`;

const DropdownTrigger = styled.div`
  width: 100%;
`;
const DropdownList = styled.div<{
  active: boolean;
  offset: number;
  leftOffset: number | string;
}>`
  width: 100%;
  display: grid;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  top: ${(props) => props.offset}px;
  left: ${(props) => props.leftOffset}px;
  ${(props) =>
    props.active &&
    css`
      visibility: visible;
      opacity: 1;
    `}

  z-index: 19;
`;

const DefaultDropdownMenu: FC<DefaultDropdownMenuProps> = ({
  trigger,
  dropList,
  className,
  triggerCls,
  dropdownCls,
  offset = 0,
  leftOffset = 0,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { value: isActive, setTrue, setFalse } = useBoolean(false);

  useOnClickOutside(dropdownRef, setFalse);

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownTrigger className={triggerCls} onClick={setTrue}>
        {trigger}
      </DropdownTrigger>
      <DropdownList
        className={dropdownCls}
        leftOffset={leftOffset}
        offset={offset}
        active={isActive}
        onClick={setFalse}
      >
        {dropList}
      </DropdownList>
    </DropdownContainer>
  );
};

export { DropdownContainer, DefaultDropdownMenu };
