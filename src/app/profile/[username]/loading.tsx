import React from 'react'

function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="relative inline-flex">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-blue-300 rounded-full animate-spin">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-gray-900 rounded-full" />
          </div>
        </div>
        <div className="text-lg font-medium">
          <span className="bg-gradient-to-r from-cyan-700 to-blue-700 text-transparent bg-clip-text animate-pulse">
            Loading your profile
          </span>
          <span className="inline-flex ml-2">
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default loading
