import { useModalWithData } from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import React, { ReactNode } from "react";
import SideBar from "./Sidebar";
import Modal from "@/components/core/Modal";
const LayoutWithSide = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { modalOpen, toggle, setSelected, selected } = useModalWithData();
  return (
    <>
      <div className="bg-bg min-h-screen overflow-y-scroll">
        <SideBar />
        <div className="ml-[250px] py-5 px-3">{children}</div>
      </div>
      <Modal open={modalOpen} toggle={toggle} data={selected} />
    </>
  );
};

export default LayoutWithSide;
