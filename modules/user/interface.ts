export interface User {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}

export interface UserTableBodyProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}
