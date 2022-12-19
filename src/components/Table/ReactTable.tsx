import React, { FC, useMemo, DependencyList, useEffect, useRef } from "react";
import {
  useTable,
  useFlexLayout,
  useSortBy,
  Column,
  Row,
  usePagination,
  Cell,
} from "react-table";
import styled, { css } from "styled-components";
import { ArrowDown, ArrowUp } from "react-feather";

import { FlexItemsCenter, GridDivCenteredRow } from "@/components/Base/Div";
import Pagination from "./Pagination";
import { SortTableHead } from "./SortTableHead";

export type TablePalette = "primary";

const CARD_HEIGHT = `71px`;

type ColumnWithSorting<D extends object = Record<string, unknown>> =
  Column<D> & {
    sortType?: string | ((rowA: Row<any>, rowB: Row<any>) => -1 | 1);
    sortable?: boolean;
  };

type TableProps = {
  palette?: TablePalette;
  data: object[];
  columns: ColumnWithSorting<object>[];
  columnsDeps?: DependencyList;
  options?: any;
  onTableRowClick?: (row: Row<any>) => void;
  className?: string;
  isLoading?: boolean;
  noResultsMessage?: React.ReactNode;
  showPagination?: boolean;
  hiddenColumns?: string[];
  hideHeaders?: boolean;
  highlightRowsOnHover?: boolean;
  sortBy?: object[];
  lastRef?: any;
  cardHeight?: string;
  headerHeight?: number;
};

export const Table: FC<TableProps> = ({
  columns = [],
  columnsDeps = [],
  data = [],
  options = {},
  noResultsMessage = null,
  onTableRowClick = undefined,
  palette = `primary`,
  isLoading = false,
  showPagination = false,
  hiddenColumns = [],
  hideHeaders,
  highlightRowsOnHover,
  sortBy = [],
  lastRef = null,
  cardHeight = CARD_HEIGHT,
  headerHeight,
}) => {
  const memoizedColumns = useMemo(
    () => columns,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    columnsDeps
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    //@ts-ignore
    page,
    //@ts-ignore
    canPreviousPage,
    //@ts-ignore
    canNextPage,
    //@ts-ignore
    pageCount,
    //@ts-ignore
    setPageSize,
    //@ts-ignore
    nextPage,
    //@ts-ignore
    previousPage,
    //@ts-ignore
    state: { pageIndex, pageSize },
    setHiddenColumns,
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: {
        pageSize: 5,
        hiddenColumns: hiddenColumns,
        sortBy: sortBy,
      },
      autoResetPage: false,
      autoResetSortBy: false,
      ...options,
    },
    useSortBy,
    usePagination,
    useFlexLayout
  );

  useEffect(() => {
    setHiddenColumns(hiddenColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultRef = useRef(null);

  return (
    <Container>
      <TableContainer>
        <ReactTable
          {...getTableProps()}
          palette={palette}
          className="react-table"
          cardHeight={cardHeight}
          headerHeight={headerHeight}
        >
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow
                className="table-row table-header"
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((column: any) => (
                  <TableCellHead
                    hideHeaders={hideHeaders}
                    {...column.getHeaderProps(
                      column.sortable
                        ? column.getSortByToggleProps()
                        : undefined
                    )}
                    key={column.id}
                  >
                    {column.render(`Header`)}
                    <SortTableHead 
                      isSortedDesc={column.isSortedDesc}
                      isSorted={column.isSorted}
                      sortable={column.sortable}
                    />
                  </TableCellHead>
                ))}
              </TableRow>
            );
          })}
          {isLoading
            ? undefined
            : page.length > 0 && (
                <TableBody className="table-body" {...getTableBodyProps()}>
                  {page.map((row: Row, idx: number) => {
                    prepareRow(row);
                    const props = row.getRowProps();
                    const localRef =
                      lastRef && idx === page.length - 1 ? lastRef : defaultRef;
                    return (
                      <TableBodyRow
                        className="table-body-row"
                        {...props}
                        ref={localRef}
                        onClick={
                          onTableRowClick
                            ? () => onTableRowClick(row)
                            : undefined
                        }
                        $highlightRowsOnHover={highlightRowsOnHover}
                        key={row.id}
                      >
                        {row.cells.map((cell: Cell) => (
                          <TableCell
                            className="table-body-cell"
                            {...cell.getCellProps()}
                            key={cell.value}
                          >
                            {cell.render(`Cell`)}
                          </TableCell>
                        ))}
                      </TableBodyRow>
                    );
                  })}
                </TableBody>
              )}
          {!!noResultsMessage &&
            !isLoading &&
            data.length === 0 &&
            noResultsMessage}
        </ReactTable>
      </TableContainer>
      {showPagination && (
        <Pagination
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgNavy};
  border-radius: 6px;
`;

const TableContainer = styled.div<{ width?: number | string }>`
  overflow-x: auto;
`;

export const TableRow = styled.div``;

const TableBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const TableBodyRow = styled.div<{ $highlightRowsOnHover?: boolean }>`
  cursor: ${(props) => (props.onClick ? `pointer` : `default`)};

  border-bottom: 1px solid #575768;
  &:last-child {
    border: none;
  }
`;

const SortIconContainer = styled.span`
  display: flex;
`;

const TableCell = styled(FlexItemsCenter)`
  box-sizing: border-box;
  &:first-child {
    padding-left: 14px;
  }
  &:last-child {
    padding-right: 14px;
  }
`;

const TableCellHead = styled(TableCell)<{ hideHeaders: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray900};
  user-select: none;
  &:first-child {
    padding-left: 18px;
  }
  &:last-child {
    padding-right: 18px;
  }
  ${(props) => (props.hideHeaders ? `display: none` : ``)}
`;

export const TableNoResults = styled(GridDivCenteredRow)`
  padding: 50px 40px;
  text-align: center;
  justify-content: center;
  margin-top: -2px;
  justify-items: center;
  grid-gap: 10px;
  font-size: 16px;
  div {
    text-decoration: underline;
    cursor: pointer;
    font-size: 16px;
  }
`;

const ReactTable = styled.div<{
  palette: TablePalette;
  cardHeight: string;
  headerHeight?: number;
}>`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  // border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 6px;

  ${(props) =>
    props.palette === `primary` &&
    css`
      // ${TableBody} {
      //   max-height: calc(100% - ${props.cardHeight});
      // }
      ${TableCell} {
        font-size: 12px;
      }
      ${TableCellHead} {
        color: ${(props) => props.theme.colors.gray};
        height: ${({ cardHeight, headerHeight }) =>
          headerHeight || cardHeight}px;
      }
      ${TableBodyRow} {
        height: ${props.cardHeight};
      }
    `}
`;

export default Table;
