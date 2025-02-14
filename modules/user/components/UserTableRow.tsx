import React from "react";
import { User } from "@/modules/user/interface";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import Link from "next/link";
import { Eye } from "lucide-react";
interface UserTableProps {
  user: User;
  index: number;
}

const UserTableRow = ({ user, index }: UserTableProps) => {
  return (
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
  );
};
export default UserTableRow;
