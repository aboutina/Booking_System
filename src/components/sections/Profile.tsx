'use client'
import { Booking_data, Profile as ProfileType, User } from '@/lib/interface'
import Image from 'next/image'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import LoginPage from '../auth/LoginPage'
import UserDropdown from '../modal/UserDropdown'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Sidebar from '@/components/sections/Sidebar';
import { toast } from 'sonner'
import { updateUser } from '@/lib/api'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import useEditBooking from '../hooks/useEditBooking'
import Nav from './Nav'
import Loader from './Loader'


function Profile({ data }: { data: ProfileType }) {
    const { auth } = useAuth()
    const router = useRouter()
    const [userForm, setUserForm] = useState(data || {
        id: 0,
        name: '',
        email: '',
        role: '',
        phone_number: '',
    })
    const [bookingData, setBookingData] = useState<Booking_data>({
        id: 0,
        user_id: 0,
        room_id: 0,
        start_date: '',
        end_date: '',
        status: '',
        created_at: '',
        updated_at: '',
        user: {
            created_at: '',
            email: '',
            id: 0,
            name: '',
            phone_number: '',
            role: '',
            updated_at: '',
        },
        room: {
            created_at: '',
            id: 0,
            img: '',
            price: '',
            room_number: '',
            status: '',
            type: '',
            updated_at: '',
        },
    });
    const useCreateBookingResult = useEditBooking({ data: bookingData, userId: data.id });
    const { handleEditBooking, isLoading, error } = useCreateBookingResult

    if (!auth) return <Loader />

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUserForm({ ...userForm, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(userForm)
        try {
            const newData = { name: userForm.name, email: userForm.email, phone_number: userForm.phone_number, role: userForm.role }
            const res = await updateUser(data.id as number, newData as User)
            if (res === 200) {
                toast("User updated successfully")
            }
        } catch (err: any) {
            console.log(err)
            toast(err.message)
        }
    }

    return (
        <>
            <Nav />
            <div className="max-w-[1400px] gap-5 p-5 md:p-10 m-auto min-h-screen w-full grid grid-cols-1 md:grid-cols-3">
                <Card className="w-full md:max-w-sm max-h-[400px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">User Info</CardTitle>
                        <CardDescription>
                            User information here...
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" name='name' placeholder="Enter your name" onChange={handleChange} value={userForm.name} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="m@example.com" onChange={handleChange} value={userForm.email} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input id="phone_number" type="text" name="phone_number" placeholder="Enter your phone number" onChange={handleChange} value={userForm.phone_number} required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSubmit} className="w-full">Save</Button>
                    </CardFooter>
                </Card>
                <Card className="w-full md:col-span-2">
                    <Table>
                        <TableCaption>A list of your recent bookings.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Room Id</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead >Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.bookings?.map((booking: Booking_data) => (
                                <TableRow className="font-semibold text-gray-600" key={booking.id}>
                                    <TableCell className="font-medium">{booking.room_id}</TableCell>
                                    <TableCell>{booking.start_date}</TableCell>
                                    <TableCell>{booking.end_date}</TableCell>
                                    <TableCell className="capitalize">{booking.status}</TableCell>
                                    {booking.status === 'pending' && <TableCell className="capitalize p-0">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="overflow-hidden"
                                                >
                                                    ...
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {/* <Darkmode /> */}
                                                <DropdownMenuItem onClick={() => {
                                                    setBookingData({ ...booking, status: 'cancelled' })
                                                    if (booking.id !== 0) {
                                                        handleEditBooking();
                                                    }
                                                }}>Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div >
        </>
    )
}

export default Profile