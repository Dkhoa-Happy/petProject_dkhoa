"use client";

import React, { useState } from "react";
import { Eye, Search } from "lucide-react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import {
  filterStatusUser,
  getAllUser,
  searchUser,
} from "@/modules/user/userApi";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/modules/user/interface";
import { useDebounce } from "use-debounce";
import EXPORTCSVButton from "@/modules/user/components/EXPORTCSVButton";
import UserTableBody from "@/modules/user/components/UserTableBody";

const UserTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(10);

  const [debounceSearchQuery] = useDebounce(searchQuery, 1000);

  const fetchUsers = async () => {
    if (debounceSearchQuery) {
      const searchResultByName = await searchUser(debounceSearchQuery);
      const searchResultByEmail = await searchUser(
        undefined,
        debounceSearchQuery,
      );

      const uniqueResults = [
        ...new Map(
          [...(searchResultByName || []), ...(searchResultByEmail || [])].map(
            (user) => [user.id, user],
          ),
        ).values(),
      ];

      return {
        data: uniqueResults,
        total: uniqueResults.length,
      };
    }

    if (statusFilter) {
      const filterResult = await filterStatusUser(statusFilter);
      return {
        data: filterResult,
        total: filterResult.length,
      };
    }

    return await getAllUser(currentPage, usersPerPage);
  };

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery(
    ["users", statusFilter, currentPage, usersPerPage, debounceSearchQuery],
    fetchUsers,
    {
      keepPreviousData: true,
    },
  );

  const users = usersData?.data || [];
  const totalUsers = usersData?.total || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleUsersPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Failed to load users. Please try again later.</p>;
  }

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
    <section>
      <div className="user-table group">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="flex items-center gap-4">
              <EXPORTCSVButton data={users} fileName={users.csv} />
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Users</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <UserTableBody
            users={users}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        <div className="px-6 py-4 border-t flex justify-between items-center">
          {users.length > 0 ? (
            <>
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                {Math.min(currentPage * usersPerPage, totalUsers)} of{" "}
                {totalUsers} entries
              </p>
              <Pagination>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                >
                  Previous
                </PaginationPrevious>
                <PaginationContent>
                  {paginationItems.map((item, index) =>
                    item === "..." ? (
                      <PaginationItem key={index}>
                        <span className="text-gray-500 px-2">...</span>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(item as number)}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                </PaginationContent>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                >
                  Next
                </PaginationNext>
              </Pagination>
              <div>
                <select
                  value={usersPerPage}
                  onChange={handleUsersPerPageChange}
                  className="border rounded-md px-2 py-1 ml-4"
                >
                  {[5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} / page
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserTable;
