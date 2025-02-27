import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const WithdrawRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(
      "https://mfs-server-gamma.vercel.app/admin/withdraw-requests/pending",
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setRequests(data.pendingRequests);
        setLoading(false);
      });
  }, []);
  console.log("all withdraw request: ", requests);

  const handleApprove = (requestId) => {
    const payload = {
      status: "approved",
      adminId: user._id,
    };
    fetch(
      `https://mfs-server-gamma.vercel.app/transaction/withdraw-request/${requestId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Request update: ", data);
        toast.success(data.message);
        setRequests((setRequests) =>
          setRequests.map((request) =>
            requestId._id === requestId
              ? { ...request, status: "approved" }
              : request
          )
        );
      })
      .catch((err) => {
        console.error("Error Updating: ", err);
      });
  };

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="mx-5 my-10">
        <section>
          <h2 className="text-3xl font-bold">Agents Withdraw Request</h2>
          {requests?.length > 0 ? (
            <div className="my-5">
              <div className="overflow-x-auto w-full rounded">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-rose-600 text-white">
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Approve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.map((request, index) => (
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-rose-200 p-2"
                            : "bg-rose-300 p-2"
                        }
                        key={request._id}
                      >
                        <td>{request.agentName}</td>
                        <td>{request.amount}TK</td>
                        <td>
                          {new Date(request.createdAt).toLocaleString("en-US", {
                            weekday: "long", // "Monday"
                            year: "numeric", // "2025"
                            month: "long", // "January"
                            day: "numeric", // "27"
                            hour: "numeric", // "5"
                            minute: "numeric", // "11"
                            second: "numeric", // "7"
                            hour12: true, // "AM/PM"
                          })}
                        </td>
                        <td>{request.status}</td>

                        <td>
                          {request.status === "approved" ? (
                            <p className="text-blue-500 text-bold">Approved</p>
                          ) : (
                            <button
                              onClick={() => handleApprove(request._id)}
                              className="btn btn-primary"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-center  text-error">
              Not Found Pending Withdraw request
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default WithdrawRequest;
