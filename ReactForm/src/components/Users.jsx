import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(true);
  //the intial render , fetch the employees from the backend
  useEffect(() => {
    isMounted.current = true;
    //use the abort controller to abort any request
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/employees", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted.current && setUsers(response.data);
      } catch (error) {
        console.log(error);
        if (error.response?.status == "403") {
          // we come here when refresh Token can expired too
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();
    //isMounted.current is set to false. This indicates that the component is being unmounted, and any subsequent asynchronous operations should be canceled or avoided.
    return () => {
      console.log("component is unmounting");
      isMounted.current = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => {
            return (
              <li key={index}>
                {user?.firstname} {user?.lastname}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br></br>
    </article>
  );
};

export default User;
