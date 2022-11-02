import { FixedNumber } from 'ethers';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import styled from 'styled-components';

const BaseInput = styled.input`
    /* Remove default styling */
    width: 50%;
    height: 100%;

    / * Remove default styling */
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    /* Text */
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #FFFFFF;
    text-align: right;
    ::placeholder {
      color: ${({ theme }) => theme.colors.whiteAlpha700}
    }
`;

type NumberInputProps = {
  value: string;
  onChange: (value: string) => void;
  max?: number;
  decimal?: string;
  disabled?: boolean;
  placeholder?: string;
  allowEmpty?: boolean;
};

const isValidInput = (value: string, allowEmpty?: boolean): boolean => {
  if (allowEmpty && value === ``) return true;
  try {
    FixedNumber.fromString(value);
    return true;
  } catch (e) {
    return false;
  }
};

const NumericInput: FC<NumberInputProps> = ({
  max = 60,
  value,
  onChange,
  disabled = false,
  placeholder = ``,
  allowEmpty = true,
}) => {
  function validate(e: KeyboardEvent<HTMLInputElement>) {
    const theEvent = e || window.event;
    const key = theEvent.key;

    const INVALID_CHARS = [`-`, `+`, `e`];
    if (INVALID_CHARS.includes(key)) {
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = `` } = e.target;
    const valid = isValidInput(value, allowEmpty);
    if (!valid) return;
    onChange(value.replace(/,/g, `.`).replace(/[e+-]/gi, ``));
  };

  return (
    <BaseInput
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      max={max}
      onKeyPress={validate}
      disabled={disabled}
    />
  );
};

export default NumericInput;
