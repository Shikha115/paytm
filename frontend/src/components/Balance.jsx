export const Balance = ({ value }) => {
  return (
    <h1 className="flex text-2xl gap-1 items-baseline">
      <span className="font-bold">Your balance</span>
      <span className="font-semibold text-white text-4xl">₹{value}</span>
    </h1>
  );
};
