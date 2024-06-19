'use state'
import { Booking_data, Profile, Room_data } from '@/lib/interface'
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Bath, BookImageIcon, Home, LineChart, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Users2 } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { logout } from './../modal/UserDropdown';
import UserTable from '../table/UserTable'
import BookingTable from './../table/BookingTable';
import RoomTable from '../table/RoomTable'
import { getBookings } from '@/lib/api'
import useAuth from '../hooks/useAuth'

function Dashboard({ rooms, users }: { rooms: Room_data[], users: Profile[] }) {
    const [tab, setTab] = useState('dashboard')
    const [bookings, setBookings] = useState<Booking_data[]>([]);
    const { token } = useAuth()

    useEffect(() => {
        if (!token) return
        const fetch = async () => {
            const res = await getBookings(token as string)
            if (res) {
                setBookings(res)
                console.log(res)
            }
        }
        fetch()
    }, [token])

    const renderComponent = () => {
        if (tab === 'dashboard') {
            return <div>Dashboard</div>
        } else if (tab === 'users') {
            return <UserTable data={users} />
        } else if (tab === 'bookings') {
            return <BookingTable data={bookings} />
        } else if (tab === 'rooms') {
            return <RoomTable data={rooms} />
        }
    }
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>

                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    onClick={() => setTab('dashboard')}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors ${tab === 'dashboard' ? 'text-foreground bg-accent' : 'text-muted-foreground'} hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    onClick={() => setTab('users')}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors ${tab === 'users' ? 'text-foreground bg-accent' : 'text-muted-foreground'} hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Users2 className="h-5 w-5" />
                                    <span className="sr-only">Users</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Users</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    onClick={() => setTab('bookings')}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors ${tab === 'bookings' ? 'text-foreground bg-accent' : 'text-muted-foreground'} hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <BookImageIcon className="h-5 w-5" />
                                    <span className="sr-only">Bookings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Bookings</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    onClick={() => setTab('rooms')}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors ${tab === 'rooms' ? 'text-foreground bg-accent' : 'text-muted-foreground'} hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Bath className="h-5 w-5" />
                                    <span className="sr-only">Rooms</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Rooms</TooltipContent>
                        </Tooltip>

                    </TooltipProvider>
                </nav>

            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setTab('dashboard')}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setTab('users')}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Users
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setTab('bookings')}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <BookImageIcon className="h-5 w-5" />
                                    Bookings
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setTab('rooms')}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Bath className="h-5 w-5" />
                                    Rooms
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link onClick={() => setTab('dashboard')} href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            {tab === 'dashoard' && <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">{tab}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src="https://res.cloudinary.com/dkibnftac/image/upload/v1690208728/deku_ggqhox.jpg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
                    {renderComponent()}
                </main>
            </div>
        </div>
    )
}

export default Dashboard