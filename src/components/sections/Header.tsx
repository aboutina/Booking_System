'use client'
import React, { useEffect, useState } from 'react'
import { Darkmode } from '../Darkmode'
import Image from 'next/image'
import { Button } from '../ui/button'
import Sidebar from './Sidebar'
import { cn } from '@/lib/utils'
import { format, startOfDay } from 'date-fns'
import { BookCheck, CalendarIcon, Divide, Warehouse } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { createBooking, getRooms } from '@/lib/api'
import { Booking } from '@/lib/interface'
import { toast } from 'sonner'
import LoginPage from '../auth/LoginPage'
import useAuth from '../hooks/useAuth'
import UserDropdown from '../modal/UserDropdown'
import { useCreateBooking } from '../hooks/useCreateBooking'
import Nav from './Nav'

function Header() {
    const [great, setGreat] = useState<string>('')
    const [checkin, setCheckin] = useState<Date | null>(null)
    const [checkout, setCheckout] = useState<Date | null>(null)
    const [room, setRoom] = useState<string>('')
    const [roomId, setRoomId] = useState<number>(0)
    const { token, auth } = useAuth()
    const useCreateBookingResult = useCreateBooking({ checkin, checkout, roomId });

    // Use handleBooking, isLoading, and error as needed
    const { handleBooking, isLoading, error } = useCreateBookingResult;

    useEffect(() => {
        const time = new Date().toTimeString()
        console.log(time)
        if (time >= '00:00:00' && time <= '12:00:00') {
            setGreat('Good Morning')
        } else if (time >= '12:00:00' && time <= '18:00:00') {
            setGreat('Good Afternoon')
        } else {
            setGreat('Good Evening')
        }
    }, [])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getRooms();
                if (data && room) {
                    const roomData = data.filter((r: any) => r.type === room.toLowerCase() && r.status === 'available')[0]
                    console.log(roomData)
                    if (roomData) {
                        setRoomId(roomData.id)
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchRooms();
    }, [room, token]);

    return (
        <div className=" w-full  min-h-[90vh] relative" style={{
            backgroundImage: `url(/assets/bg2.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {/* <Darkmode /> */}
            <Nav />
            <div className="rounded-3xl absolute min-h-[250px] bg-white w-full max-w-[1000px] shadow-2xl p-5 md:p-10 -bottom-10 left-1/2 transform -translate-x-1/2">
                <h1 className="text-[#008EC4] font-bold text-4xl">{great}!</h1>
                <p className="text-[#1A1A1A] font-medium text-md md:text-2xl my-3">Your one-stop solution for all your booking needs.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border gap-1 items-center rounded-3xl md:rounded-full p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <span className="w-full flex items-center text-sm px-4 py-2 border-2 rounded-md border-muted justify-center text-muted-foreground font-normal" >
                                <Warehouse className="mr-2 h-4 w-4" /> {room ? room : 'Room Type'}
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setRoom('Single')}>Single</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRoom('Double')}>Double</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRoom('Suite')}>Suite</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    " justify-start text-left font-normal",
                                    !checkin && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkin ? format(checkin, "PPP") : <span>Check in</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">

                            <Calendar
                                mode="single"
                                selected={checkin ? checkin : undefined}
                                onSelect={(day) => setCheckin(day ? day : null)}
                                disabled={(date) =>
                                    date < startOfDay(new Date())
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !checkout && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkout ? format(checkout, "PPP") : <span>Check out</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkout ? checkout : undefined}
                                onSelect={(day) => setCheckout(day ? day : null)}
                                disabled={(date) =>
                                    date < startOfDay(new Date())
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleBooking} variant="outline" className="font-normal text-muted-foreground"><BookCheck className="mr-2 h-4 w-4" />Book Now</Button>
                </div>
            </div>
        </div>
    )
}

export default Header