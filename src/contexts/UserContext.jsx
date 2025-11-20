import { useContext, createContext, useState, useEffect } from "react";

import axios from "axios";
import { serverURL } from "../main";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getCurrentUser = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/user/getcurrentuser`,
        {},
        { withCredentials: true }
      );
      console.log("Current User Data:", result.data);
      setUserData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
