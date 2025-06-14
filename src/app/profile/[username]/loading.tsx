import React from 'react'

function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="flex flex-row gap-2 inline-flex">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <div className="text-sm font-medium">
          <span className="bg-blue-700 text-transparent bg-clip-text animate-pulse">
            Loading profile
          </span>
        </div>
      </div>
    </div>
  )
}

export default loading
