import { memo } from "react";

 const Notification = ({ info }) => {
  const { status, data } = info;
  return (
    <div
      className={`${
        data.status == "success" ? "bg-green-500" : "bg-red-400"
      } ${status ? "active" : ""} notification text-white p-4`}
    >
      <h1 className="font-medium border-b w-max mb-3">
        {data.status == "success" ? "Successfull" : "Error Occured"}
      </h1>
      <p className="text-sm">{data.msg}</p>
    </div>
  );
};

export default memo(Notification);
