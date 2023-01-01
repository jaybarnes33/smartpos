import React, { ReactNode } from "react";

const IconButton = ({
  icon,
  action,
}: {
  icon: ReactNode;
  action: () => void;
}) => {
  return (
    <button
      className="rounded-xl flex items-center justify-center text-2xl h-9 w-9 bg-slate-200"
      onClick={action}
    >
      {icon}
    </button>
  );
};

export default IconButton;
