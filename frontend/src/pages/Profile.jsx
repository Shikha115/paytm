import React, { memo, useEffect, useState } from "react";
import { url } from "../components/url";
import axios from "axios";
import { InputBox } from "../components/InputBox";
import Notification from "../components/Notification";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    status: false,
    data: {},
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${url}/user/update`,
        {
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("profile = ", response.data);

      setNotification({
        status: true,
        data: response.data.msg,
      });

    } catch (error) {
      console.error(
        "Error during profile = ",
        error.response.data || error.message
      );
      setNotification({
        status: true,
        data: error.response.data.msg,
      });
    }
    // ===============
    setTimeout(() => {
      setNotification((prev) => {
        return {
          ...prev,
          status: false,
        };
      });
    }, 2000);
    // ===============
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setUsername(currentUser.username);
  }, [currentUser]);

  return (
    <>
      {/* <Notification info={notification} /> */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 overflow-y-scroll min-h-screen flex justify-center items-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="border text-card-foreground max-w-lg p-12 w-screen bg-white shadow-lg rounded-lg">
              <div className="flex flex-col space-y-1.5 mb-6">
                <h2 className="text-3xl font-bold text-center">User Profile</h2>
              </div>
              <div className="">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">
                      {currentUser.firstName
                        ? currentUser.firstName[0].toUpperCase()
                        : ""}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {currentUser.firstName}
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-1">
                  <InputBox
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    label={"First Name"}
                    value={firstName}
                  />
                  <InputBox
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    label={"Last Name"}
                    value={lastName}
                  />
                  <InputBox
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    label={"Email"}
                    disabled
                  />
                  <InputBox
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    label={"Password"}
                  />
                  <div>
                    <button
                      type="submit"
                      className="mt-4 text-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Profile);
