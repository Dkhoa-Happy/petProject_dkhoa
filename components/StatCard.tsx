"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { getAllUser } from "@/module/user/userApi";

interface StatCardProps {
  title: string;
  icon: ReactNode;
}

const StatCard = ({ title, icon }: StatCardProps) => {
  const [totalUsers, setTotalUsers] = useState<string>("0");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { total } = await getAllUser();
        setTotalUsers(total || "0");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        setTotalUsers("0");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="post group">
      <div className="   p-6 flex justify-center items-center">
        <div className="mr-4 bg-green-100 rounded-full p-3">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
};
export default StatCard;
