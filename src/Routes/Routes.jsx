import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import UserTransaction from "../pages/Dashboard/UserTransaction/UserTransaction";
import AllAgents from "../pages/Dashboard/AllAgents/AllAgents";
import WithdrawRequest from "../pages/Dashboard/WithdrawRequest/WithdrawRequest";
import AgentCashRequest from "../pages/Dashboard/AgentCashRequest/AgentCashRequest";
import PendingCashRequest from "../pages/Dashboard/PendingCashRequest/PendingCashRequest";
import UserCashIn from "../pages/Dashboard/UserCashIn/UserCashIn";
import UserAgentTransaction from "../pages/Dashboard/UserAgentTransaction/UserAgentTransaction";
import Withdraw from "../pages/Dashboard/Withdraw/Withdraw";
import CashOut from "../pages/Dashboard/CashOut/CashOut";
import SendMoney from "../pages/Dashboard/SendMoney/SendMoney";
import Notifications from "../pages/Dashboard/Notifications/Notifications";
import PrivateRoute from "./PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute>
            <Notifications></Notifications>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-transaction/:userId",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserTransaction></UserTransaction>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-transaction-history/:userId",
        element: (
          <PrivateRoute>
            <UserAgentTransaction></UserAgentTransaction>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-agents",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllAgents></AllAgents>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/withdraw-request/:userId",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <Withdraw></Withdraw>
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/pending-withdraw",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <WithdrawRequest></WithdrawRequest>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/pending-money-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PendingCashRequest></PendingCashRequest>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "/user-cash-in",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <UserCashIn></UserCashIn>
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/cash-out",
        element: (
          <PrivateRoute>
            <CashOut></CashOut>
          </PrivateRoute>
        ),
      },
      {
        path: "/send-money",
        element: (
          <PrivateRoute>
            <SendMoney></SendMoney>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
