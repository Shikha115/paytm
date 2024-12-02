import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Loading from "./Loading";

function ProtectedRoute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    status: false,
    data: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);

      setNotification({
        status: true,
        data: { status: "failure", msg: "You are not logged in!" },
      });
    } else {
      setLoading(false);

      setNotification({
        status: true,
        data: { status: "success", msg: "You are logged in!" },
      });
    }

    setTimeout(() => {
      setNotification((prev) => {
        return {
          ...prev,
          status: false,
        };
      });
    }, 2000);
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Notification info={notification} />
        <Loading />
      </>
    );
  }

  return (
    <>
      {/* <Notification info={notification} /> */}
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
