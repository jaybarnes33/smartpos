import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { createContext, useContext } from "react";

interface ModalContextInterface {
  toggle: () => void;
  modalOpen: boolean;
  selected: ReactNode;
  setSelected: Dispatch<SetStateAction<ReactNode>>;
}

const ModalCtx = createContext<ModalContextInterface | null>(null);

// Provider in your app

interface IProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const toggle = () => setModalOpen(!modalOpen);

  const [selected, setSelected] = useState<ReactNode>("");
  return (
    <ModalCtx.Provider
      value={{
        toggle,
        selected,
        setSelected,
        modalOpen,
      }}
    >
      {children}
    </ModalCtx.Provider>
  );
};

export const useModalWithData = () => {
  const context = useContext(ModalCtx);

  if (!context) {
    throw new Error("useModal was called without a provider");
  }

  return context;
};

export default ModalProvider;
