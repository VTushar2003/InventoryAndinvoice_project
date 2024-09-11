import React from 'react'
import logo from "../../pages/Home/logo.svg"

const Loading = () => {
    return (
        <div className="flex-col gap-4 w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[--light-blue] rounded-full">
                <img src={logo} alt="" className='animate-ping h-8' />
            </div>
        </div>
    )
}

export default Loading



