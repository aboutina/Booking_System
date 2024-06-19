// Content.tsx
'use client'
import { useEffect, useState } from 'react';
import { getRooms } from "@/lib/api";
import { Room_data } from "@/lib/interface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MoveRight, Warehouse } from 'lucide-react';
import { BookNow } from '../modal/BookNow';
import Image from 'next/image';
import { Button } from '../ui/button';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

function Content() {
    const [rooms, setRooms] = useState<Room_data[]>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await getRooms();
            setRooms(rooms);
        };
        fetchRooms();
    }, []);

    if (rooms.length === 0) return <Loader />

    return (
        <div className="w-full min-h-[90vh] relative max-w-[1000px] m-auto p-5 md:p-10" >
            <h1 className="text-center text-[clamp(20px,5vw,35px)] font-bold mt-16">Top Book Now</h1>
            <div className="grid gap-3 md:gap-10 lg:grid-cols-4 md:grid-cols-3 grid-cols-2  mt-3">
                {rooms && rooms.map((room) => {
                    return (
                        <div key={room.id} className="flex flex-col items-center justify-center ">
                            <Image src={`http://127.0.0.1:8000/images/${room.img}`} alt={room.type} width={500} height={500} className=" max-h-60  object-cover rounded-sm" />
                            <div className="flex w-full mt-1 flex-wrap justify-between font-semibold md:font-bold text-sm md:text-md">
                                <h3>Room:{room.room_number}</h3>
                                <p>₱{room.price}</p>
                            </div>
                            <BookNow roomId={room.id} />
                        </div>)
                }).slice(0, 8)}
            </div>
            <div className="flex flex-col items-center mt-5 justify-center">
                <Button onClick={() => router.push('/rooms')} className="gap-3 rounded-full text-md md:text-lg font-semibold w-[clamp(70px,100%,200px)] h-10 md:h-14" variant="outline">See all <MoveRight /></Button>
            </div>

        </div>
    )
}

export default Content;