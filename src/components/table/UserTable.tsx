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
import { Profile } from '@/lib/interface';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { deleteUser } from '@/lib/api';
import { AddUser } from '../modal/AddUser';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { EditUser } from '../modal/EditUser';

function UserTable({ data }: { data: Profile[] }) {
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
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.email.toLowerCase().includes(filter.toLowerCase()) ||
            item.phone_number.toLowerCase().includes(filter.toLowerCase())
        )
        setFiltered(results as any);
    }, [filter])

    const removeUser = async (id: number) => {
        try {
            const res = await deleteUser(id as number);
            toast("User deleted successfully!")
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
                <AddUser />
            </div>
            <Card className="w-full ">
                <Table>
                    <TableCaption>A list of all users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">User Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered?.map((user: Profile) => (
                            <TableRow className="font-semibold text-gray-600" key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>{formatDate(user.created_at)}</TableCell>
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
                                            <EditUser id={user.id} data={user} />
                                            <DropdownMenuItem onClick={() => removeUser(user.id)}>Delete</DropdownMenuItem>
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

export default UserTable