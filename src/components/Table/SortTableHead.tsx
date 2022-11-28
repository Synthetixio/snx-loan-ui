import React, { FC } from "react";
import { ArrowDown, ArrowUp } from "react-feather";

type SortTableHeadProps = {
  sortable: boolean;
  isSorted: boolean;
  isSortedDesc: boolean;
};

export const SortTableHead: FC<SortTableHeadProps> = ({
  sortable,
  isSorted,
  isSortedDesc,
}) => {
  if (!sortable) return null;

  if (!isSorted) {
    return <ArrowUp size={12} color="#2ED9FF" />;
  }

  if (isSortedDesc) {
    return <ArrowUp size={12} color="#2ED9FF" />;
  } else {
    return <ArrowDown size={12} color="#2ED9FF" />;
  }
};
