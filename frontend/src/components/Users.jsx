import { memo, useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./url";

const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const filterUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${url}/user/bulk?filter=${filter}`,{ headers: { Authorization: `Bearer ${token}` },});
     
      setUsers(data.data);
      //   console.log("filter users = ", data);
    } catch (error) {
      console.log(
        "filter users error = ",
        error.response.data || error.message
      );
    }
  };

  useEffect(() => {
    filterUser();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="mt-2 mb-4">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          value={filter}
          type="search"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mb-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() => {
            navigate(
              "/send-money?id=" +
                encodeURIComponent(user._id) +
                "&name=" +
                encodeURIComponent(user.firstName)
            );
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

export default memo(Users);
