"use client";

import { saveAs } from "file-saver";
import Papa from "papaparse";
import { User } from "@/modules/user/interface";

interface ExportCSVButtonProps {
  data: User[];
  fileName?: string;
}

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({
  data,
  fileName = "users.csv",
}) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // Convert data to CSV
    const csv = Papa.unparse(data);

    // Create a Blob from CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Trigger download
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Export CSV
    </button>
  );
};

export default ExportCSVButton;
