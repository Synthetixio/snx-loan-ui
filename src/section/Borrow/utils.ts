export const getSafeMinCRatioBuffer = (
  debtAsset: string,
  collateralAsset: string,
) => {
  if (collateralAsset.includes(`ETH`) && debtAsset.includes(`sETH`))
    return 0.05;
  return 0.1;
};
