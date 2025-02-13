"use client";

import { saveAs } from "file-saver";
import Papa from "papaparse";
import { User } from "@/modules/user/interface";
import { useState, useCallback } from "react";

interface ExportCSVButtonProps {
  data: User[];
  fileName?: string;
}

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({
  data,
  fileName = "users.csv",
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(() => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    setIsExporting(true);
    try {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setIsExporting(false);
    }
  }, [data, fileName]);

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || data.length === 0}
      className={`px-4 py-2 rounded text-white ${
        data.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      aria-label="Export user data as CSV"
    >
      {isExporting ? "Exporting..." : "Export CSV"}
    </button>
  );
};

export default ExportCSVButton;
