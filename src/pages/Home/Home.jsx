import toast from "react-hot-toast";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { IoCashOutline } from "react-icons/io5";
import { MdRealEstateAgent, MdSendToMobile } from "react-icons/md";
import { PiHandWithdrawBold, PiHandWithdrawFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCashRequest = async (id) => {
    if (!id) {
      console.error("User ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/transaction/cash-request/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token-based authentication
          },
          body: JSON.stringify({ userId: id }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to send cash request.");
      }
    } catch (error) {
      console.error("Error sending cash request:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  if (!user) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        No user data found.
      </div>
    );
  }

  let cards;

  if (user.accountType === "Admin") {
    cards = (
      <>
        <NavLink to="/all-users">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <FaUserAlt className="text-6xl" />
              <h2 className="card-title">All Users</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to="/all-agents">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <MdRealEstateAgent className="text-6xl" />
              <h2 className="card-title">All Agent</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to="/pending-withdraw">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <PiHandWithdrawBold className="text-6xl" />
              <h2 className="card-title">Pending Withdraw Request</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to="/pending-money-request">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <FaMoneyBillTrendUp className="text-6xl" />
              <h2 className="card-title">Agent Money Request</h2>
            </div>
          </div>
        </NavLink>
      </>
    );
  } else if (user.accountType === "Agent") {
    cards = (
      <>
        <button
          onClick={() => handleCashRequest(user._id)}
          className="card bg-gray-200 text-gray-900 "
        >
          <div className="card-body items-center text-center">
            <FaMoneyBillTrendUp className="text-6xl" />
            <h2 className="card-title">Cash Request To Admin</h2>
          </div>
        </button>
        <NavLink to="/user-cash-in">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <BsFillSendCheckFill className="text-6xl" />
              <h2 className="card-title">Send Money To User</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to={`/withdraw-request/${user._id}`}>
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <PiHandWithdrawFill className="text-6xl" />
              <h2 className="card-title">Withdraw Request</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to={`/user-transaction-history/${user._id}`}>
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Transaction</h2>
              <GrTransaction className="text-6xl" />
            </div>
          </div>
        </NavLink>
      </>
    );
  } else if (user.accountType === "User") {
    cards = (
      <>
        <NavLink to="/cash-out">
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <IoCashOutline className="text-6xl" />
              <h2 className="card-title">Cash Out</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to={"/send-money"}>
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <MdSendToMobile className="text-6xl" />
              <h2 className="card-title">Send Money</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to={`/user-transaction-history/${user._id}`}>
          <div className="card bg-gray-200 text-gray-900 ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Transaction</h2>
              <GrTransaction className="text-6xl" />
            </div>
          </div>
        </NavLink>
      </>
    );
  } else {
    cards = <p>No valid account type found.</p>;
  }

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3  gap-3 mx-5">
      {cards}
    </div>
  );
};

export default Home;
