import React, { memo } from 'react'

function Loading() {
  return (
  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center h-screen text-4xl text-white p-4 font-bold">
     Loading...
  </div>
  )
}

export default memo(Loading);