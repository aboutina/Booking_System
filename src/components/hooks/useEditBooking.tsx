import React, { useState } from 'react'
import useAuth from './useAuth';
import { useRouter } from 'next/navigation';
import { getRoom, updateBooking, updateRoom } from '@/lib/api';
import { Booking, Booking_data, Room } from '@/lib/interface';
import { toast } from 'sonner';

function useEditBooking({ data, userId }: { data: Booking_data, userId: number }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth()
    const router = useRouter()

    const handleEditBooking = async () => {
        setIsLoading(true);
        setError(null);
        if (!token) {
            router.push('/login');
            return;
        }
        console.log(data)
        try {
            if (data) {
                const bookingData = {
                    user_id: userId,
                    room_id: data.room_id,
                    start_date: data.start_date, // format the date
                    end_date: data.end_date, // format the date
                    status: data.status
                }

                const response = await updateBooking(data.id, bookingData as Booking, token)
                if (response) {
                    toast(`Success ${data.status} the booking!`)
                    // Update the room status to booked
                } else {
                    toast("Edit Booking failed: " + response.statusText)
                }
            }
        } catch (err: any) {
            setError(err.message);
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    return { handleEditBooking, isLoading, error };
}

export default useEditBooking