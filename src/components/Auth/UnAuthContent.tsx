/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/reduxFeatures/authState/authStateSlice";
import { Spinner } from "react-bootstrap";
import {
  setDisplayLoginToolTip,
  setShowLoginNotificationModal
} from "@/reduxFeatures/app/appSlice";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  // Navigate authenticated users to Feed page or redirect to page B4 login.
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      // Go to Auth Page
      const push2Page = JSON.parse(sessionStorage.getItem("pageB4Login"))
        ? JSON.parse(sessionStorage.getItem("pageB4Login"))
        : "/feed";

      sessionStorage.removeItem("pageB4Login");
      // Hide Login Notification Modal While Logged in
      dispatch(setShowLoginNotificationModal<any>(false));
      // Hide Login ToolTip-Aside For The Whole App
      dispatch(setDisplayLoginToolTip<any>(false));
      router.push(push2Page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      {!isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="loader-wrapper">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}
