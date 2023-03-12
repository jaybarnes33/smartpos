import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppContextInterface {
  toggle: () => void;
  newBill: boolean;
  setTheme: Dispatch<SetStateAction<string>>;
  theme: string;
}

const AppCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

interface IProps {
  children: React.ReactNode;
}

export const DashProvider = ({ children }: IProps) => {
  const [newBill, setNewBill] = useState(false);
  const [theme, setTheme] = useState("");
  const toggle = () => {
    setNewBill(!newBill);
  };

  return (
    <AppCtx.Provider
      value={{
        toggle,
        newBill,
        setTheme,
        theme,
      }}
    >
      <div className={theme}>{children}</div>
    </AppCtx.Provider>
  );
};

export const useDash = () => {
  const context = useContext(AppCtx);

  if (!context) {
    throw new Error("useDash was called without a provider");
  }

  return context;
};

export default DashProvider;
