import React from 'react'

function Loading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full bg-gray-50'>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-gray-700">Yükleniyor...</p>
    </div>
  )
}

export default Loading