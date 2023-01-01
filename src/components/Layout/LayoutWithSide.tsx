import useUser from "@/hooks/useUser";
import React, { ReactNode } from "react";
import SideBar from "./Sidebar";

const LayoutWithSide = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  return (
    <div className="bg-bg min-h-screen overflow-y-scroll">
      <SideBar />
      <div className="ml-[250px] px-3">
        <div className="mt-4">
          <h1>Hello {user.name},</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSide;
