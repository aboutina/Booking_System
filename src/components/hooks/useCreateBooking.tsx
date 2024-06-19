import { useState } from 'react';
import { createBooking, getRoom, updateRoom } from '@/lib/api';
import { Booking, Room, UseCreateBooking } from '@/lib/interface';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { useRouter } from 'next/navigation';


export const useCreateBooking = ({ checkin, checkout, roomId }: UseCreateBooking) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth()
    const router = useRouter()

    const handleBooking = async () => {
        setIsLoading(true);
        setError(null);
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            if (checkin && checkout) {
                const bookingData = {
                    user_id: 1,
                    room_id: roomId,
                    start_date: checkin.toISOString().slice(0, 10), // format the date
                    end_date: checkout.toISOString().slice(0, 10), // format the date
                    status: "pending"
                }

                const response = await createBooking(bookingData as Booking, token as string)

                if (response) {
                    toast("Successfully booked! ")
                    const res = await getRoom(roomId)
                    if (res) {
                        const roomData: Room = {
                            status: "booked",
                            type: res.type,
                            price: res.price,
                            room_number: res.room_number
                        };
                        await updateRoom(roomId, roomData, token);
                    }
                } else {
                    toast("Booking failed: " + response.statusText)
                }
            } else {
                toast("Please fill all the fields")
            }
        } catch (err: any) {
            setError(err.message);
            toast(err.message)
        } finally {
            setIsLoading(false);
        }
    }

    return { handleBooking, isLoading, error };
}