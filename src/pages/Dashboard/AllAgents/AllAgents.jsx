import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/admin/get-agents", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setAgents(data);
        setLoading(false);
      });
  }, []);
  console.log("all agents: ", agents);

  const handleBlockAgent = (agentId) => {
    fetch(`http://localhost:5000/admin/block-agent/${agentId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User blocked: ", data);
        setAgents((prevAgents) =>
          prevAgents.map((agent) =>
            agent._id === agentId ? { ...agent, isBlocked: true } : agent
          )
        );
      })
      .catch((err) => {
        console.error("Error blocking user: ", err);
      });
  };

  const handleVerifyAgent = (agentId) => {
    fetch(`http://localhost:5000/admin/verify-agent/${agentId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("agent verify: ", data);
        setAgents((prevAgents) =>
          prevAgents.map((agent) =>
            agent._id === agentId ? { ...agent, isVerified: true } : agent
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
          <h2 className="text-3xl font-bold">All Agents</h2>
          {agents.length > 0 ? (
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
                      <th>Income</th>
                      <th>Is Verified</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents?.map((agent, index) => (
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-rose-200 p-2"
                            : "bg-rose-300 p-2"
                        }
                        key={agent._id}
                      >
                        <td>
                          <Link
                            to={`/user-transaction/${agent._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {agent.name}
                          </Link>
                        </td>
                        <td>{agent.email}</td>
                        <td>{agent.mobile}</td>
                        <td>{agent.nid}</td>
                        <td>{agent.balance}TK</td>
                        <td>{agent.income}TK</td>
                        <td>
                          {agent.isVerified ? (
                            <p className="text-blue-500 text-bold">Verified</p>
                          ) : (
                            <button
                              onClick={() => handleVerifyAgent(agent._id)}
                              className="btn btn-warning"
                            >
                              Verify Agent
                            </button>
                          )}
                        </td>
                        <td>
                          {agent.isBlocked ? (
                            "Blocked"
                          ) : (
                            <button
                              onClick={() => handleBlockAgent(agent._id)}
                              className="btn btn-warning"
                            >
                              Block Agent
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
            <p className="text-2xl text-center  text-error">Not agent found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default AllAgents;
