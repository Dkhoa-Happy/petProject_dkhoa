import React from "react";
import { Search } from "lucide-react";

interface SearchUserProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUser = ({ value, onChange }: SearchUserProps) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      className="pl-10 pr-4 py-2 border rounded-lg"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);
export default SearchUser;
