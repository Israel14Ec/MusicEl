import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function LinkNav({ dataLink, children }) {

    const { pathname } = useLocation()
    const isCurrentPage = dataLink.to === pathname

    return (
        <Link className='p-1 hover:bg-gray-900' to={dataLink.to}>
            <div className={`flex justify-between cursor-pointer px-5 items-center
                ${isCurrentPage && 'border-l-4 border-green-500'}
            `}>
                <p className={`${!isCurrentPage ? 'text-gray-400': 'font-semibold'}`}>
                    {dataLink.name}
                </p>
                <div className='w-5' >
                    {children}
                </div>
            </div>
        </Link>

    )
}
