import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  //   const [currentPage, setCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  useEffect(() => {
    props.onPageChange(currentPage);
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < props.totalPages) {
      setCurrentPage(currentPage + 1);
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
      <span>{`Page ${currentPage} of ${props.totalPages}`}</span>
      <Button
        variant="outline"
        disabled={currentPage === props.totalPages}
        onClick={goToNextPage}
        ml={2}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
