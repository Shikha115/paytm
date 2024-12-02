import React, { memo } from "react";

const ErrorMessage = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex justify-center items-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="font-bold text-4xl mb-4">Something Went Wrong</h1>
        <p className="text-lg text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default memo(ErrorMessage);
