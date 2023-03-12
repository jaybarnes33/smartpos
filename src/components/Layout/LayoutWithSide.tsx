import { useModalWithData } from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import React, { ReactNode } from "react";
import SideBar from "./Sidebar";
import Modal from "@/components/core/Modal";
import AuthContent from "../Auth/AuthContent";
const LayoutWithSide = ({ children }: { children: ReactNode }) => {
  const { modalOpen, toggle, selected } = useModalWithData();
  return (
    <AuthContent>
      <div className="bg-bg dark:bg-neutral-900 fixed h-screen w-full ">
        <SideBar />
        <div className="ml-[250px] py-5 px-3 dark:text-neutral-200 ">
          {children}
        </div>
      </div>
      <Modal open={modalOpen} toggle={toggle} data={selected} />
    </AuthContent>
  );
};

export default LayoutWithSide;
