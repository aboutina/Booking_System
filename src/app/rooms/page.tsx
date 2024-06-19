'use client'
import LoginPage from '@/components/auth/LoginPage';
import useAuth from '@/components/hooks/useAuth';
import { BookNow } from '@/components/modal/BookNow';
import UserDropdown from '@/components/modal/UserDropdown';
import Footer from '@/components/sections/Footer';
import Sidebar from '@/components/sections/Sidebar';
import { getRooms } from '@/lib/api';
import { Room_data } from '@/lib/interface';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from './../../components/sections/Nav';
import Loader from '@/components/sections/Loader';


function Page() {
    const [rooms, setRooms] = useState<Room_data[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await getRooms();
            setRooms(rooms);
        };
        fetchRooms();
    }, [])

    if (rooms.length === 0) return <Loader />

    return (
        <>
            <Nav />
            <div className="max-w-[1300px] w-full m-auto p-5">
                {rooms ? <> <h1 className="text-center text-[clamp(20px,5vw,35px)] font-bold mt-0 md:mt-10">Rooms</h1>
                    <div className="grid gap-3 md:gap-10 lg:grid-cols-4 md:grid-cols-3 grid-cols-2  mt-3">
                        {rooms.map((room) => {
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
                    </div> </> :
                    <div className=" flex-col gap-5  flex items-center justify-center min-h-[60vh]">
                        <h1 className="text-center text-[clamp(20px,5vw,35px)] font-bold ">There is no available rooms.</h1>
                        <Image src='/assets/illu.png' alt='illu' width={500} height={500} className=" max-h-60  object-cover rounded-sm" />
                    </div>}
            </div>
            <Footer />
        </>
    );
}

export default Page;
