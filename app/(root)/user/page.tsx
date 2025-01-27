"use client";

import UserTable from "@/components/UserTable";
import StatCard from "@/components/StatCard";
import { MonitorSmartphone, Users } from "lucide-react";

const Page = () => {
  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Manage Your User</h1>
        <p className="sub-heading !max-w-3xl">
          Effective management of users leads to improved satisfaction and
          productivity.
        </p>
      </section>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatCard
            title="Total Users"
            value="100"
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Active Users"
            value="54"
            icon={<MonitorSmartphone className="h-6 w-6" />}
          />
        </div>
        <UserTable />
      </div>
    </>
  );
};

export default Page;
