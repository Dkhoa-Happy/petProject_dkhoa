import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  usersPerPage: number;
  users: any[];
  onPageChange: (page: number) => void;
  onUsersPerPageChange: (value: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  totalUsers,
  usersPerPage,
  users,
  onPageChange,
  onUsersPerPageChange,
}: PaginationControlsProps) => {
  const generatePagination = (
    currentPage: number,
    totalPages: number,
    siblings: number = 1,
  ) => {
    const range = [];
    const start = Math.max(currentPage - siblings, 1);
    const end = Math.min(currentPage + siblings, totalPages);

    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push("...");
      }
      range.push(totalPages);
    }

    return range;
  };

  const paginationItems = generatePagination(currentPage, totalPages, 1);

  return (
    <div className="px-6 py-4 border-t flex justify-between items-center">
      {users.length > 0 ? (
        <>
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
            {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers}{" "}
            entries
          </div>

          <Pagination>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            />
            <PaginationContent>
              {paginationItems.map((item, index) =>
                item === "..." ? (
                  <PaginationItem key={index}>
                    <span className="text-gray-500 px-2">...</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => onPageChange(item as number)}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </Pagination>

          <select
            value={usersPerPage}
            onChange={(e) => onUsersPerPageChange(Number(e.target.value))}
            className="border rounded-md px-2 py-1 ml-4"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} / page
              </option>
            ))}
          </select>
        </>
      ) : (
        <p className="text-sm text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default PaginationControls;
