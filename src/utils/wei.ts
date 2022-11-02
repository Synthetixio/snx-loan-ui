import { TokenInterface } from '@/constants/tokens';
import Wei, { wei } from '@synthetixio/wei';
const generateWei = (
  value: string,
  token: TokenInterface,
): { amount: Wei; asset: string } => {
  const amount = value ? wei(value, token.decimals) : wei(0);
  return {
    amount,
    asset: token.name,
  };
};

const safeWei = (value: string) => {
  return value ? wei(value, 18) : wei(0);
};

export { safeWei };

export default generateWei;
