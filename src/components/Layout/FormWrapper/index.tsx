import { useRouter } from "next/router";
import React, { FormEvent, ReactNode } from "react";
import Info from "./Info";

const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const { pathname } = useRouter();

  return (
    <div className="grid grid-cols-2 bg-white">
      <div className="h-screen  bg-slate-200">
        <Info />
      </div>
      <div className="grid items-center px-4">
        <div>
          <h1 className="text-3xl tracking-wide font-heading font-bold">
            {pathname.includes("login") ? "Welcome Back" : "Get Started"}
          </h1>
          <form onSubmit={onSubmit}>
            <small className="text-gray-400 mb-5 block">
              Please input your details to continue
            </small>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
