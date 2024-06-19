import React from 'react'
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
import { Room_data } from '@/lib/interface';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { AddRoom } from '../modal/AddRoom';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { deleteRoom } from '@/lib/api';
import { toast } from 'sonner';
import useAuth from '../hooks/useAuth';
import { EditRoom } from '../modal/EditRoom';

function RoomTable({ data }: { data: Room_data[] }) {
    const { token } = useAuth()
    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const removeRoom = async (id: number) => {
        if (!token) return
        try {
            const res = await deleteRoom(id as number, token as string);
            toast("Room deleted successfully!")
        } catch (err: any) {
            toast(err.message)
            console.warn(err)
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
                    />
                </div>
                <AddRoom />
            </div>
            <Card className="w-full ">
                <Table>
                    <TableCaption>A list of all rooms.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Room Num</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[150px]">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((room: Room_data) => (
                            <TableRow className="font-semibold text-gray-600" key={room.id}>
                                <TableCell className="font-medium">{room.room_number}</TableCell>
                                <TableCell className="font-medium">{room.price}</TableCell>
                                <TableCell>{room.type}</TableCell>
                                <TableCell className="capitalize">{room.status}</TableCell>
                                <TableCell>{formatDate(room.created_at)}</TableCell>
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
                                            {/* <Darkmode /> */}
                                            <EditRoom id={room.id} data={room} />
                                            <DropdownMenuItem onClick={() => removeRoom(room.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card></>
    )
}

export default RoomTable