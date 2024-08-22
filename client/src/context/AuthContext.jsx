import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("Auth-User") || null)
  );

  const [hotelURL, setHotelURL] = useState([]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, hotelURL, setHotelURL }}
    >
      {children}
    </AuthContext.Provider>
  );
};
