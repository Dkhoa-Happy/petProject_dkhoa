import type React from "react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { Eye } from "lucide-react";
import Link from "next/link";
import { UserTableBodyProps } from "@/modules/user/interface";
import Image from "next/image";

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Image
          src="/icons/Loader.svg"
          alt="Loader icon"
          width={56}
          height={56}
          className="object-contain animate-spin"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">
          Failed to load users. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.id}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">
                  {user.gender === "male" ? (
                    <CgGenderMale className="text-blue-600 h-6 w-6" />
                  ) : (
                    <CgGenderFemale className="text-pink-600 h-6 w-6" />
                  )}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/user/${user.id}`}>
                    <button className="flex items-center text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableBody;
