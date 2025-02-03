import EXPORTCSVButton from "@/modules/user/components/EXPORTCSVButton";
import { User } from "@/modules/user/interface";

interface UserTableHeaderProps {
  statusFilter: string;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  users: User[];
}

const UserTableHeader = ({
  statusFilter,
  onStatusChange,
  users,
}: UserTableHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Users</h2>
    <div className="flex items-center gap-4">
      <EXPORTCSVButton data={users} fileName="users.csv" />
      <select
        value={statusFilter}
        onChange={onStatusChange}
        className="border rounded-md px-2 py-1"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  </div>
);

export default UserTableHeader;
