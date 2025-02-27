import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [userid, setUserid] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const logOut = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("user_id"); // Make sure user_id is available in localStorage

    if (!userId) {
      // If user_id is not available, show an error
      toast.error("User ID is missing. Unable to log out.");
      return;
    }
    fetch("https://mfs-server-gamma.vercel.app/user/logout", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // console.log(data);
          toast.success("Logout successful");
          // window.location.reload();
          setUser(null);
          setUserid(null);
          setToken(null);
          setRole(null);
          setIsAuth(false);
          localStorage.removeItem("user_id");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      })
      .catch((error) => {
        toast.error(error || "Login Out");
      });
  };

  const loginUser = async (mobileOrEmail, pin) => {
    const deviceId = uuidv4();
    try {
      const response = await fetch(
        "https://mfs-server-gamma.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileOrEmail, pin, deviceId }),
        }
      );
      const data = await response.json();
      console.log("user details from get auth: ", data);

      if (data.data && data.data.access_token) {
        setUserid(data.data.id);
        setToken(data.data.access_token);
        setRole(data.data.role);
        setIsAuth(true);
        localStorage.setItem("user_id", data.data.id);
        localStorage.setItem("authToken", data.data.access_token);
        toast.success(data.data.message);

        const userData = await getAuthUser();
        // console.log("user details from get auth: ", userData);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const getAuthUser = async () => {
    const UserId = localStorage.getItem("user_id");
    const Token = localStorage.getItem("authToken");

    if (UserId && Token) {
      try {
        const response = await fetch(
          `https://mfs-server-gamma.vercel.app/user/details/${UserId}/`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        // console.log("User details fetched:", data);

        if (data && data.user) {
          setUser(data.user);
          setUserid(UserId);
          setToken(Token);
          localStorage.setItem("user", JSON.stringify(data.user));

          return data.user;
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    }

    setUser(null);
    setUserid(null);
    setToken(null);
    return null;
  };

  useEffect(() => {
    getAuthUser()
      .then((user) => {
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuth(true);
      setUser(user);
      setRole(user.accountType);
    }
    setLoading(false);
  }, []);

  const authInfo = {
    logOut,
    loginUser,
    user,
    isAuth,
    loading,
    role,
    token,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProviders;
