import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const UserAgentTransaction = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://mfs-server-gamma.vercel.app/transaction/user-transactions/${userId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setTransactions(data.transactions);
        setLoading(false);
      });
  }, []);
  console.log("all transactions: ", transactions);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="mx-5 my-10">
        <section>
          <h2 className="text-3xl font-bold">Transaction History</h2>
          {transactions.length > 0 ? (
            <div className="my-5">
              <div className="overflow-x-auto w-full rounded">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-rose-600 text-white">
                      <th>Sender</th>
                      <th>Reciever</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Transaction Fee</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.map((transaction, index) => (
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-rose-200 p-2"
                            : "bg-rose-300 p-2"
                        }
                        key={transaction.id}
                      >
                        <td>{transaction.senderName}</td>
                        <td>{transaction.receiverName}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.amount}TK</td>
                        <td>{transaction.fee}TK</td>
                        <td>
                          {new Date(transaction.createdAt).toLocaleString(
                            "en-US",
                            {
                              weekday: "long", // "Monday"
                              year: "numeric", // "2025"
                              month: "long", // "January"
                              day: "numeric", // "27"
                              hour: "numeric", // "5"
                              minute: "numeric", // "11"
                              second: "numeric", // "7"
                              hour12: true, // "AM/PM"
                            }
                          )}
                        </td>
                        {/* <td>{transaction.createdAt}</td> */}
                        <td>{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-center  text-error">
              No transaction found.
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default UserAgentTransaction;
