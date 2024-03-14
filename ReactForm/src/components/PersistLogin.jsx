import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/UseRefreshToken";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  useEffect(() => {
    if (persist) console.log("persist useEffect");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [persist]);

  useEffect(() => {
    console.log(`isLoading:${isLoading}`);
    console.log(`accessToken:${auth?.accessToken}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;

