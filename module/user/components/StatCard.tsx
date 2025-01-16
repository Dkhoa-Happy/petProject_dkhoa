"use client";

import React, { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/module/user/userApi";

interface StatCardProps {
  title: string;
  icon: ReactNode;
}

const StatCard = ({ title, icon }: StatCardProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: () => getAllUser(1, 100),
    select: (data) => data?.total || "0",
    staleTime: 60000,
  });

  const totalUsers = isLoading ? "Loading..." : isError ? "Error" : data;

  return (
    <div className="post group">
      <div className="p-6 flex justify-center items-center">
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
