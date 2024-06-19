'use client'
import LoginAdmin from '@/components/auth/LoginAdmin'
import useAuth from '@/components/hooks/useAuth'
import Dashboard from '@/components/sections/Dashboard'
import Loader from '@/components/sections/Loader'
import { getRooms, getUsers } from '@/lib/api'
import React, { useEffect, useState } from 'react'

function Page() {
    const { auth, token } = useAuth()
    const [usersData, setUserData] = useState([])
    const [roomsData, setRoomData] = useState([])

    useEffect(() => {
        if (!token) return
        const fetchAll = async () => {
            const [users, rooms] = await Promise.all([getUsers(), getRooms()])
            if (users.length > 0) {
                setUserData(users)
            }
            if (rooms.length > 0) {
                setRoomData(rooms)
            }
        }
        fetchAll()
    }, [token])

    if (!auth) return <Loader />

    return (
        <>
            {auth ? <Dashboard rooms={roomsData} users={usersData} /> : <LoginAdmin />}
        </>
    )
}

export default Page