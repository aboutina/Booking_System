import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getUsers, getRooms } from '@/lib/api';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useEditBooking from "../hooks/useEditBooking";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"

export function EditBooking({ data }) {
    // Use handleBooking, isLoading, and error as needed
    const [bookingForm, setBookingForm] = useState({
        id: data.id || 0,
        user_id: data.user_id || 0,
        room_id: data.room_id || 0,
        start_date: data.start_date || "",
        end_date: data.start_date || "",
        status: data.status || "",
    });
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])
    const useCreateBookingResult = useEditBooking({ data: bookingForm, userId: bookingForm.user_id });
    const { handleEditBooking, isLoading, error } = useCreateBookingResult

    const handleChange = (e) => {
        const { name, value } = e.target
        setBookingForm({
            ...bookingForm,
            [name]: value,
        });
    }

    useEffect(() => {
        const fetch = async () => {
            const [usersRes, roomsRes] = await Promise.all([getUsers(), getRooms()]);

            if (usersRes) {
                setUsers(usersRes);

            }

            if (roomsRes) {
                setRooms(roomsRes);
            }
        }

        fetch();
    }, []);

    useEffect(() => {
        console.log(bookingForm);
    }, [bookingForm])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Booking</DialogTitle>
                    <DialogDescription>
                        Update the booking information below!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"

                                    className="overflow-hidden justify-start"
                                >
                                    {
                                        bookingForm.user_id !== 0
                                            ? (users.find(user => user.id === bookingForm.user_id) || {}).name || 'No User Found'
                                            : 'Select Room'
                                    }
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuRadioGroup value={bookingForm.user_id}
                                    onValueChange={(newValue) => setBookingForm({ ...bookingForm, user_id: newValue })}>
                                    {users && users.map(user => {
                                        return <DropdownMenuRadioItem key={user.id} value={user.id}>{user.name}</DropdownMenuRadioItem>
                                    })}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"

                                    className="overflow-hidden justify-start"
                                >
                                    {bookingForm.room_id !== 0 ? `Room Num: ${bookingForm.room_id}` : 'Select Room'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuRadioGroup
                                    value={bookingForm.room_id}
                                    onValueChange={(newValue) => setBookingForm({ ...bookingForm, room_id: newValue })}
                                >
                                    {rooms && rooms.map(room => {
                                        return <DropdownMenuRadioItem key={room.id} value={room.id}>Num: {room.room_number}</DropdownMenuRadioItem>
                                    })}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !bookingForm.start_date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingForm.start_date ? format(bookingForm.start_date, "PPP") : <span>Check in</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={bookingForm.start_date ? new Date(bookingForm.start_date) : undefined}
                                onSelect={(day) => {
                                    setBookingForm(prevState => ({
                                        ...prevState,
                                        start_date: day ? format(day, "yyyy-MM-dd") : null
                                    }));
                                }}
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
                                    "w-full justify-start text-left font-normal",
                                    !bookingForm.end_date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingForm.end_date ? format(bookingForm.end_date, "PPP") : <span>Check in</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={bookingForm.end_date ? new Date(bookingForm.end_date) : undefined}
                                onSelect={(day) => {
                                    setBookingForm(prevState => ({
                                        ...prevState,
                                        end_date: day ? format(day, "yyyy-MM-dd") : null
                                    }));
                                }}
                                disabled={(date) =>
                                    date < startOfDay(new Date())
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="overflow-hidden capitalize justify-start"
                            >
                                {bookingForm.status !== '' ? bookingForm.status : 'Select Status'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuRadioGroup value={bookingForm.status}
                                onValueChange={(newValue) => setBookingForm({ ...bookingForm, status: newValue })}>
                                <DropdownMenuRadioItem value='pending'>Pending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='confirmed'>Confirmed</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='checked_in'>Checked In</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='checked_out'>Check Out</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='cancelled'>Cancelled</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <DialogFooter>
                    <Button onClick={handleEditBooking} type="submit">
                        {isLoading ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
