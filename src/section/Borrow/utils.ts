export const getSafeMinCRatioBuffer = (
  debtAsset: string,
  collateralAsset: string,
) => {
  if (collateralAsset.includes(`ETH`) && debtAsset.includes(`sETH`))
    return 0.02;
  return 0.1;
};
