import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

type DynamicPaginationProps = {
  totalNumberItems: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
};

const DynamicPagination: React.FC<DynamicPaginationProps> = ({
  totalNumberItems,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalNumberItems / itemsPerPage);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
                <PaginationItem
                key={index}
                onClick={() => handlePagination(page)}
                >
                <PaginationLink isActive={currentPage === page}>
                {page}

                </PaginationLink>
                </PaginationItem>
            );
        })}
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DynamicPagination;
