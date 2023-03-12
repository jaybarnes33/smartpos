import { Product } from "@/types/item";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

interface AppContextInterface {
  add: (item: Product) => void;
  clear: () => void;
  items: Product[];
  remove: (id: string) => void;
  handleQuantity: (id: string, quantity: number) => void;
}

const BillCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

interface IProps {
  children: React.ReactNode;
}

export const BillProvider = ({ children }: IProps) => {
  const [items, setItems] = useState<Product[]>([]);

  const add = (item: Product) => {
    const existingItem = items.find(({ _id }) => _id === item._id);

    if (existingItem) {
      // existingItem.quantity++;
      // const updatedItems = items.map((item) => {
      //   if (item._id === existingItem._id) {
      //     return existingItem;
      //   }
      //   return item;
      // });
      // setItems(updatedItems);
      toast.warn("Item already exists in bill");
    } else {
      setItems([...items, item]);
    }
  };

  const clear = () => {
    setItems([]);
  };

  const handleQuantity = (id: string, quantity: number) => {
    console.log("here");
    const existingItem = items.find(({ _id }) => _id === id);

    if (existingItem) {
      existingItem.number = quantity;
      const updatedItems = items.map((item) => {
        if (item._id === existingItem._id) {
          return existingItem;
        }
        return item;
      });

      setItems(updatedItems);
    }
  };

  const remove = (id: string) => {
    const filtered = items.filter(({ _id }) => _id !== id);

    setItems(filtered);
  };
  return (
    <BillCtx.Provider
      value={{
        add,
        clear,
        items,
        remove,
        handleQuantity,
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
