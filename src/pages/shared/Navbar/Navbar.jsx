import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProviders";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showBalance, setShowBalance] = useState(false);

  return (
    <>
      <div className="navbar bg-rose-500 text-white sticky top-0 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-rose-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <p
                  className="cursor-pointer select-none"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? (
                    <ul>
                      {user?.accountType === "Admin" && (
                        <>
                          <li>System Money: {user?.totalMoneyInSystem} TK</li>
                          <li>Total Income: {user?.totalIncome} TK</li>
                        </>
                      )}
                      {user?.accountType === "Agent" && (
                        <li>Total Income: {user?.income} TK</li>
                      )}
                      {user?.balance && <li>Balance: {user?.balance} TK</li>}
                    </ul>
                  ) : (
                    "Check balance"
                  )}
                </p>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/notifications">Inbox</Link>
              </li>

              {user ? (
                <>
                  <li onClick={logOut}>Logout</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className=" flex justify-between items-center gap-10">
            <h1 className="text-xs md:font-extrabold">{user?.name}</h1>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p
                className="cursor-pointer select-none"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <ul>
                    {user?.accountType === "Admin" && (
                      <>
                        <li>System Money: {user?.totalMoneyInSystem} TK</li>
                        <li>Total Income: {user?.totalIncome} TK</li>
                      </>
                    )}
                    {user?.accountType === "Agent" && (
                      <li>Total Income: {user?.income} TK</li>
                    )}
                    {user?.balance && <li>Balance: {user?.balance} TK</li>}
                  </ul>
                ) : (
                  "Check balance"
                )}
              </p>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notifications">Inbox</Link>
            </li>

            {user ? (
              <>
                <li onClick={logOut}>
                  <Link>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
