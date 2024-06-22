import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';
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
import { Booking_data, Profile } from '@/lib/interface';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { EditBooking } from './../modal/EditBooking';
import { toast } from 'sonner';
import { deleteBooking } from '@/lib/api';
import useAuth from '../hooks/useAuth';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface BookingTableProps {
    data: Booking_data[];
}

const BookingTable: React.FC<BookingTableProps> = ({ data }) => {
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
    const { token } = useAuth()
    const [filtered , setFiltered] = useState( data || [])
    const [filter , setFilter] = useState<string>('')
    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        console.log(data)
        if (!filter) {
            setFiltered(data as any)
            return;
        }
        const results = data.filter((item) =>
            item.user.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.user.email.toLowerCase().includes(filter.toLowerCase()) ||
            item.status.toLowerCase().includes(filter.toLowerCase()) ||
            item.room.room_number.toLowerCase().includes(filter.toLowerCase())
        )
        setFiltered(results as any);
    }, [filter])

    const removeBooking = async (id: number) => {
        if (!token) return
        try {
            const res = await deleteBooking(id as number, token as string);
            toast("Booking deleted successfully!")
        } catch (err: any) {
            toast(err.message)
        }
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <div >
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
       
        <Card className="w-full ">
            <Table>
                <TableCaption>A list of your recent bookings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Room Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead >Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(filtered) && filtered?.map((booking: Booking_data) => (
                        <TableRow className="font-semibold text-gray-600" key={booking.id}>
                            <TableCell className="font-medium">{booking.room_id}</TableCell>
                            <TableCell >{booking.user.name}</TableCell>
                            <TableCell>{formatDate(booking.start_date)}</TableCell>
                            <TableCell>{formatDate(booking.end_date)}</TableCell>
                            <TableCell className="capitalize">{booking.status}</TableCell>
                            <TableCell className="capitalize p-0">
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
                                        <DropdownMenuItem onClick={() => removeBooking(booking.id)}>
                                            Delete
                                        </DropdownMenuItem>
                                        <EditBooking data={booking} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
        </>
    )
}

export default BookingTable