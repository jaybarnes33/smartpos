import LayoutWithSide from "@/components/Layout/LayoutWithSide";
import { useDash } from "@/hooks/useDash";
import React from "react";

const Settings = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  const { setTheme, theme } = useDash();
  return (
    <>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-yellow-600">
          Settings
        </h1>

        <div className="px-7 dark:text-neutral-100">
          <ul className="text-xl flex flex-col gap-3 mt-4">
            {theme !== "dark" && (
              <li
                onClick={() => setTheme("dark")}
                className="hover:scale-105  hover:bg-primary hover:mx-2 p-2 transition"
              >
                Dark mode
              </li>
            )}

            {theme === "dark" && (
              <li
                onClick={() => setTheme("light")}
                className="hover:scale-105  hover:bg-primary hover:mx-2 p-2 transition"
              >
                Light Mode
              </li>
            )}

            <li
              onClick={handleLogout}
              className="hover:scale-105 hover:bg-primary hover:mx-2 p-2 transition"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Settings;
