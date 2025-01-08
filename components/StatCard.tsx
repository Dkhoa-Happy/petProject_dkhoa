import React, { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="post group">
      <div className="   p-6 flex justify-center items-center">
        <div className="mr-4 bg-green-100 rounded-full p-3">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
export default StatCard;
