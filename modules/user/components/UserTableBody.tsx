import React from "react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { Eye } from "lucide-react";
import Link from "next/link";
import { User } from "@/modules/user/interface";

interface UserTableBodyProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Failed to load users. Please try again later.</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-500">
          <th>User ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id} className="border-t">
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                {user.gender === "male" ? (
                  <CgGenderMale className="text-blue-600 h-7 w-7" />
                ) : (
                  <CgGenderFemale className="text-pink-600 h-7 w-7" />
                )}
              </td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <Link href={`/user/${user.id}`} passHref>
                  <button className="flex items-center text-blue-500 hover:text-blue-700">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center text-gray-500">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTableBody;
