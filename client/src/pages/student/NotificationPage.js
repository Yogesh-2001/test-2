import { Card } from "@material-ui/core";
import React from "react";
import { useProfile } from "../../context/ProfileDetailsContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const NotificationPage = () => {
  const {
    unreadnotifications,
    readnotifications,
    setreadNotifications,
    setUnreadNotifications,
  } = useProfile();
  const [{ user }] = useAuth();
  const handleRead = () => {
    axios
      .put(`http://localhost:8080/api/v1/user/mark-all-read/${user?._id}`, {})
      .then((res) => {
        toast.success(res.data.message);
        setreadNotifications([...readnotifications, ...unreadnotifications]);
        setUnreadNotifications([]);
      });
  };
  return (
    <>
      <Card className="col-12 p-3">
        <h3>All Latest Notifications</h3>

        {unreadnotifications && unreadnotifications.length > 0 && (
          <section className="col-12 my-3">
            <h4>UnRead Notifications</h4>
            <a href="#" onClick={handleRead}>
              mark all as read
            </a>
            {unreadnotifications.length > 0 &&
              unreadnotifications.map((notification, index) => (
                <>
                  <div className="alert alert-dark my-2" role="alert">
                    {index + 1} {notification?.message}
                  </div>
                </>
              ))}
          </section>
        )}
        {readnotifications && readnotifications.length > 0 && (
          <section className="col-12 my-3">
            <h4>Read Notifications</h4>
            {readnotifications.length > 0 &&
              readnotifications.map((notification, index) => (
                <>
                  <div className="alert alert-primary my-2" role="alert">
                    {index + 1} {notification?.message}
                  </div>
                </>
              ))}
          </section>
        )}
      </Card>
    </>
  );
};

export default NotificationPage;
