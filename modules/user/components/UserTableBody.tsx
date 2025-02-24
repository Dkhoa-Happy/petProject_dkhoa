import type React from "react";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { Eye } from "lucide-react";
import Link from "next/link";
import { UserTableBodyProps } from "@/modules/user/interface";
import Image from "next/image";
import UserTableRow from "@/modules/user/components/UserTableRow";

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
              <UserTableRow key={user.id} user={user} index={index} />
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
