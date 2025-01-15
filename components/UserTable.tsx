"use client";

import React, { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { User } from "@/module/user/interface";
import { getAllUser } from "@/module/user/userApi";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUser();
      setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section>
        <div className="user-table group">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Users</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
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
                {currentUsers.map((user, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t flex justify-between items-center">
            {users.length > 0 ? (
              <>
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstUser + 1} to{" "}
                  {Math.min(indexOfLastUser, users.length)} of {users.length}{" "}
                  entries
                </p>
                <Pagination>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                  >
                    Previous
                  </PaginationPrevious>
                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => handlePageChange(i + 1)}
                          active={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                  >
                    Next
                  </PaginationNext>
                </Pagination>
              </>
            ) : (
              <p className="text-sm text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserTable;
