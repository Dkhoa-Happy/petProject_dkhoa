"use client";

import React, { useState } from "react";
import { Eye, Search } from "lucide-react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { getAllUser, searchUser } from "@/module/user/userApi";
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
import { User } from "@/module/user/interface";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(10);

  //Xủ lí search user nếu không phân trang
  const fetchUsers = async () => {
    if (searchQuery) {
      const searchResult = await searchUser(searchQuery);
      return {
        data: searchResult,
        total: searchResult.length,
      };
    }
    return await getAllUser(currentPage, usersPerPage);
  };

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery(["users", currentPage, usersPerPage, searchQuery], fetchUsers, {
    keepPreviousData: true,
  });

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
          <table className="w-full">
            <thead>
              <tr className="text-left justify-center text-gray-500">
                <th className="pb-4">User ID</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Gender</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Total Post</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user: User, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="py-4">{user.id}</td>
                    <td className="py-4">{user.name}</td>
                    <td className="py-4">
                      {user.gender === "male" ? (
                        <CgGenderMale className="text-blue-600 h-7 w-7" />
                      ) : (
                        <CgGenderFemale className="text-pink-600 h-7 w-7" />
                      )}
                    </td>
                    <td className="py-4">{user.email}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-16-medium ${
                          user?.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4">10</td>
                    <td className="py-4">
                      <Link href={`/user/${user.id}`} passHref>
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <Eye className="h-4 w-4 mr-1" />
                          View Posts
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
