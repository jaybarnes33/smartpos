/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import useUser from "@/hooks/useUser";
import Loader from "../core/Loader";

export default function AuthContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, authenticating } = useUser();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      router.replace("/login");
    }
  }, [isAuthenticated, authenticating]);
  return (
    <>
      {isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="loader-wrapper  bg-transparent fixed w-screen h-screen grid place-items-center">
          <Loader />
        </div>
      )}
    </>
  );
}
