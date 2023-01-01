import { Item } from "@/types/item";
import { createContext, useContext, useState } from "react";

interface AppContextInterface {
  add: (item: Item) => void;
  items: Item[];
  remove?: (item: Item) => void;
}

const BillCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

interface IProps {
  children: React.ReactNode;
}

export const BillProvider = ({ children }: IProps) => {
  const [items, setItems] = useState<Item[]>([]);

  const add = (item: Item) => {
    setItems([...items, item]);
  };

  return (
    <BillCtx.Provider
      value={{
        add,
        items,
      }}
    >
      {children}
    </BillCtx.Provider>
  );
};

export const useBill = () => {
  const context = useContext(BillCtx);

  if (!context) {
    throw new Error("useBill was called without a provider");
  }

  return context;
};

export default BillProvider;
