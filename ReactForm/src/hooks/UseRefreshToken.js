import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });

      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        console.log(response.data.roles);
        return {
          ...prev,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.log(" error happen");
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
