import { memo, useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { url } from "../components/url";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    status: false,
    data: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      });

      console.log("response.data", response.data);

      if (!response.data.token) {
        setNotification({
          status: false,
          data: { msg: "Invalid credentials!" },
        });
        return;
      }
      localStorage.setItem("token", response.data.token);
      const name =
        response.data.data.firstName + " " + response.data.data.lastName;
      navigate(`/dashboard?name=${encodeURIComponent(name)}`);

      setNotification({
        status: true,
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response.data || error.message
      );
      setNotification({
        status: true,
        data: error.response.data,
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
  };

  return (
    <>
      <Notification info={notification} />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <form onSubmit={handleSubmit}>
              <InputBox
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="John"
                label={"First Name"}
                value={firstName}
              />
              <InputBox
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Doe"
                label={"Last Name"}
                value={lastName}
              />
              <InputBox
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                placeholder="shikha@gmail.com"
                label={"Email"}
              />
              <InputBox
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="123456"
                label={"Password"}
              />
              <div className="pt-4">
                <Button type="submit" label={"Sign up"} />
              </div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Sign in"}
                to="/"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Signup);
