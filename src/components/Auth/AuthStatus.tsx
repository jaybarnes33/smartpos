import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { user, selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import {
  selectAcceptedMediaTypes,
  setPopulateAcceptedImagesTypes,
  setPopulateAcceptedVideosTypes
} from "@/reduxFeatures/app/appSlice";
import { setDisplayTheme } from "@/reduxFeatures/app/displayThemeSlice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const acceptedMediaTypes = useSelector(selectAcceptedMediaTypes);

  // Pre-set App Theme Preference
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
      // Browser Support Theme
      if (!localStorage.getItem("displayTheme")) {
        localStorage.setItem("displayTheme", "light");
      } else {
        if (localStorage.getItem("displayTheme") === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          document.documentElement.classList.add("globalsDark");
          document.documentElement.classList.add("darkUtils");
          dispatch(setDisplayTheme("dark"));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Save user to state if user is logged in & no user in state
    if (localStorage.getItem("accessToken")) {
      if (!stateUser) {
        (async function () {
          try {
            const response = await axios.get(`${config.serverUrl}/api/auth`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            });
            dispatch(user(response.data));
          } catch (error) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        })();

        // Set Accepted media types to state
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageExt: any = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videoExt: any = [];

        for (const key in acceptedMediaTypes) {
          const splitKey = key.split("/");
          const mediaType = splitKey[0];

          if (mediaType === "image") {
            imageExt.push(...acceptedMediaTypes[key]);
          } else if (mediaType === "video") {
            videoExt.push(...acceptedMediaTypes[key]);
          }
        }
        dispatch(setPopulateAcceptedImagesTypes(imageExt));
        dispatch(setPopulateAcceptedVideosTypes(videoExt));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default AuthStatus;
