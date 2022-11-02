import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Flex } from '@/components/Base/Div';
import { Text } from '@/components/Base/Text';

type PaginationProps = {
  pageIndex: number;
  pageCount: number;
  canNextPage: boolean;
  canPreviousPage: boolean;
  nextPage(): void;
  previousPage(): void;
  setPageSize(size: number): void;
};

const Pagination = ({
  pageIndex = 5,
  pageCount,
  canNextPage,
  canPreviousPage,
  nextPage,
  previousPage,
  setPageSize,
}: PaginationProps) => {
  const getButtonColor = (isAbled: boolean): string => {
    return isAbled ? `#fff` : `#6c6c7e`;
  };
  return (
    <Container>
      <LeftPanel>
        <Text size={14} color="#6C6C7E">
          Show rows per page
        </Text>
        <select
          value={pageIndex}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 25].map((pageSize) => {
            return (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            );
          })}
        </select>
      </LeftPanel>
      <RightPanel>
        <div>
          <Text color="#6C6C7E">1-5 </Text>
          <Text color="#9999AC">of {pageCount}</Text>
        </div>
        <Flex>
          <ArrowButton disabled={!canPreviousPage} onClick={previousPage}>
            <ChevronLeft color={getButtonColor(canPreviousPage)} />
          </ArrowButton>
          <ArrowButton disabled={!canNextPage} onClick={nextPage}>
            <ChevronRight color={getButtonColor(canNextPage)} />
          </ArrowButton>
        </Flex>
      </RightPanel>
    </Container>
  );
};

export default Pagination;

const Container = styled(Flex)`
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  border-top: 1px solid #575768;
`;

const LeftPanel = styled(Flex)`
  align-items: center;
  gap: 8px;

  select {
    padding: 0 12px;
    color: white;
    background: transparent;
    border: 1px solid #6c6c7e;
    border-radius: 6px;

    cursor: pointer;
    width: 75px;
    height: 32px;
  }
`;

const RightPanel = styled(Flex)`
  gap: 37.5px;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  color: rgba(255, 255, 255, 0.8);
`;
