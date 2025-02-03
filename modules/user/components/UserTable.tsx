"use client";

import React, { useState } from "react";
import {
  filterStatusUser,
  getAllUser,
  searchUser,
} from "@/modules/user/userApi";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import UserTableBody from "@/modules/user/components/UserTableBody";
import UserTableHeader from "@/modules/user/components/UserTableHeader";
import SearchUser from "@/modules/user/components/SearchUser";
import PaginationControls from "@/modules/user/components/PaginationControls";

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

  const handleUsersPerPageChange = (value: number) => {
    setUsersPerPage(value);
    setCurrentPage(1);
  };

  return (
    <section>
      <div className="user-table group">
        <div className="p-6">
          <UserTableHeader
            statusFilter={statusFilter}
            onStatusChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            users={users}
          />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Users</h2>
            <SearchUser
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <UserTableBody
            users={users}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
          usersPerPage={usersPerPage}
          users={users}
          onPageChange={handlePageChange}
          onUsersPerPageChange={handleUsersPerPageChange}
        />
      </div>
    </section>
  );
};

export default UserTable;
