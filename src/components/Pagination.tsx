import React, { useState } from "react";
import { Button, Box } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  //   const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={goToPreviousPage}
        mr={2}
      >
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={goToNextPage}
        ml={2}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
