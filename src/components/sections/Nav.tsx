import Image from 'next/image'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import LoginPage from '../auth/LoginPage'
import UserDropdown from '../modal/UserDropdown'
import Sidebar from './Sidebar'

function Nav() {
    const { auth } = useAuth()
    const router = useRouter()
    return (
        <div className="bg-[#0182B0]">
            <div className="z-30 flex  max-w-[1300px] m-auto justify-between items-center py-5 px-3 text-black">
                <Image onClick={() => router.push('/')} src="/assets/booking.png" alt="logo" width={100} height={100} />
                <ul className=" gap-10 text-sm font-medium text-white lg:flex hidden cursor-pointer">
                    <li onClick={() => router.push('/')} > Home</li>
                    <li onClick={() => router.push('/rooms')}>Rooms</li>
                    <li>Contact</li>
                </ul>
                <span className="hidden lg:block">{!auth ? <LoginPage /> : <UserDropdown />}</span>
                <div className="lg:hidden block">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Nav