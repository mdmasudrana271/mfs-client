import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

const Notifications = () => {
  const [notifications, setUNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:5000/user/notifications/${user._id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setUNotifications(data.notifications);
        setLoading(false);
      });
  }, []);

  console.log("all notifications: ", notifications);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3  gap-3 mx-5">
      {notifications.length <= 0 ? (
        <p className="text-2xl text-center  text-error">
          No Notification Found.
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="card bg-neutral text-neutral-content md:w-96"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">{notification.title}</h2>
              <p>{notification.message}</p>
              <div className="card-actions justify-end">
                {new Date(notification.createdAt).toLocaleString("en-US", {
                  weekday: "long", // "Monday"
                  year: "numeric", // "2025"
                  month: "long", // "January"
                  day: "numeric", // "27"
                  hour: "numeric", // "5"
                  minute: "numeric", // "11"
                  second: "numeric", // "7"
                  hour12: true, // "AM/PM"
                })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
