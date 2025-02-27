import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://mfs-server-gamma.vercel.app/admin/get-users", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setUsers(data);
        setLoading(false);
      });
  }, []);
  console.log("all users: ", users);

  const handleBlockUser = (userId) => {
    fetch(`https://mfs-server-gamma.vercel.app/admin/block-user/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User blocked: ", data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: true } : user
          )
        );
      })
      .catch((err) => {
        console.error("Error blocking user: ", err);
      });
  };

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="mx-5 my-10">
        <section>
          <h2 className="text-3xl font-bold">All Users</h2>
          {users.length > 0 ? (
            <div className="my-5">
              <div className="overflow-x-auto w-full rounded">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-rose-600 text-white">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>NID No</th>
                      <th>Balance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-rose-200 p-2"
                            : "bg-rose-300 p-2"
                        }
                        key={user._id}
                      >
                        <td>
                          <Link
                            to={`/user-transaction/${user._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {user.name}
                          </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.nid}</td>
                        <td>{user.balance}TK</td>
                        {user.isBlocked ? (
                          "Blocked"
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user._id)}
                            className="btn btn-warning"
                          >
                            Block User
                          </button>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-center  text-error">Not user found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default AllUsers;
