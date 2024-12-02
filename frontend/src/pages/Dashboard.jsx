import { memo, useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Balance } from "../components/Balance";
import  Users  from "../components/Users";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { url } from "../components/url";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [balance, setBalance] = useState(null);

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data.data[0]);
      // console.log("current user = ", response.data);
    } catch (error) {
      console.log("current user = ", error.message || error.response.data);
    }
  };

  const getUserBalance = async () => {
    const token = localStorage.getItem("token");
    // console.log("token = ", token);
    try {
      const { data } = await axios.get(`${url}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(data.data.balance);
      // console.log("get Balance = ", data);
    } catch (error) {
      console.log("get Balance error = ", error.response.data || error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getUserBalance();
  }, []);

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 overflow-y-scroll min-h-screen">
      <Appbar username={`${currentUser.firstName} ${currentUser.lastName}` || ""} />
      <div className="container mx-auto my-10">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default memo(Dashboard);
