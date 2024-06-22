
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Darkmode } from '../Darkmode';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import { User2 } from 'lucide-react';

export const logout = (router : any) => {
    Cookies.remove('authtoken');
    toast("You have logged out");
    router.refresh()
}

function UserDropdown() {
    const router = useRouter()
    const { id } = useAuth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <User2 />
                    {/* <Image
                        src="https://res.cloudinary.com/dkibnftac/image/upload/v1690208728/deku_ggqhox.jpg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    /> */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <Darkmode /> */}

                <DropdownMenuItem onClick={() => router.push(`/${id}`)}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout(router)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown