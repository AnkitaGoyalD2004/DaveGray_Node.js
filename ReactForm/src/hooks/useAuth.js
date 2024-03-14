import { useContext, useDebugValue } from "react";

// import AuthContext from "../../../ReactForm/src/Context/AuthProvider";

import AuthContext from "../Context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth?.user ? "Logged In" : "Logged Out");
  return useContext(AuthContext);
};

export default useAuth;
