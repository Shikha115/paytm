import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { memo, useState } from "react";
import Notification from "../components/Notification";
import { url } from "../components/url";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    status: false,
    data: {},
  });

  const transferMoney = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${url}/account/transfer`,
        {
          amount,
          receiverId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("transfer = ", data);
      setNotification({
        status: true,
        data,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log("transfer error = ", error?.response?.data || error.message);
      setNotification({
        status: true,
        data: error.response.data.msg || error.message,
      });
    }

    // ==========
    setTimeout(() => {
      setNotification((prev) => {
        return {
          ...prev,
          status: false,
        };
      });
    }, 2000);
  };

  return (
    <>
      <Notification info={notification} />
      <div className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {name ? name[0].toUpperCase() : ""}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <form onSubmit={transferMoney} className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    value={amount}
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  Initiate Transfer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SendMoney);
