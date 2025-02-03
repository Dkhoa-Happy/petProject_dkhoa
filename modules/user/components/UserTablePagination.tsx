import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserTablePaginationProps {
  currentPage: number;
  usersPerPage: number;
  totalUsers: number;
  onPageChange: (page: number) => void;
  onUsersPerPageChange: (usersPerPage: number) => void;
}

const UserTablePagination: React.FC<UserTablePaginationProps> = ({
  currentPage,
  usersPerPage,
  totalUsers,
  onPageChange,
  onUsersPerPageChange,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <>
      <p className="text-sm text-gray-500">
        Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
        {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers}{" "}
        entries
      </p>
      <Pagination>
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          Previous
        </PaginationPrevious>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </PaginationNext>
      </Pagination>
      <div className="flex items-center mt-4">
        <label htmlFor="usersPerPage" className="mr-2 text-sm text-gray-500">
          Rows per page:
        </label>
        <select
          id="usersPerPage"
          value={usersPerPage}
          onChange={(e) => onUsersPerPageChange(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </>
  );
};

export default UserTablePagination;
