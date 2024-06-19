import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import LoginPage from '../auth/LoginPage'
import useAuth from '../hooks/useAuth'


function Sidebar() {
    const { auth } = useAuth()
    return (
        <Sheet>
            <SheetTrigger><Menu className="text-white text-lg" /></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Booking</SheetTitle>
                    <SheetDescription className="flex flex-col gap-5">
                        <Button variant="secondary" className="w-full">Home</Button>
                        <Button variant="secondary" className="w-full">Rooms</Button>
                        <Button variant="secondary" className="w-full">Contact</Button>
                        {!auth && <LoginPage />}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default Sidebar