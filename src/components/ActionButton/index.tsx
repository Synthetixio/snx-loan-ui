import styled, { css } from 'styled-components';
import { Button } from '@/components/Base/Button';

type ActionButtonProps = {
  msg: string;
  disabled: boolean;
  onClick(): void;
};

const IndexButton = styled(Button)<{ disabled: boolean }>`
  width: 100%;
  height: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.colors.greenCyan};
  background: linear-gradient(90deg, #85ffc4, #5cc6ff);
  ${({ disabled }) =>
    disabled &&
    css`
      background: rgba(86, 86, 99, 0.6);
      color: #565663;
      cursor: not-allowed;
      &:hover {
        box-shadow: unset;
      }
    `};
`;

export default function ActionButton({
  onClick,
  msg = `Borrow`,
  disabled = false,
}: ActionButtonProps): JSX.Element {
  return (
    <IndexButton disabled={disabled} onClick={onClick}>
      <span>{msg}</span>
    </IndexButton>
  );
}
