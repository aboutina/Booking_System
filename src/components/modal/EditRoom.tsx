import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import useAuth from "../hooks/useAuth"
import { updateRoom } from "@/lib/api"
import { Room_data, Room } from "@/lib/interface"
import Image from "next/image"

export function EditRoom({ id, data }: { id: number, data: Room_data }) {
    const [roomForm, setRoomForm] = useState({
        type: data.type || '',
        price: data.price || 0,
        status: data.status || "available",
        room_number: data.room_number || 0,
    })

    console.log(data)
    const [loading, setLoading] = useState(false)
    const { token } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file") {
            if (e.target.files) {
                setRoomForm({
                    ...roomForm,
                    [e.target.name]: e.target.files[0],
                });
            }
        } else {
            setRoomForm({
                ...roomForm,
                [e.target.name]: e.target.value,
            });
        }
    }

    useEffect(() => {
        console.log(roomForm)
    }, [roomForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return
        setLoading(true)
        try {

            const res = await updateRoom(id as number, roomForm as Room, token as string)
            if (res) {
                setLoading(false)
                toast('Room updated successfully')
            }
        } catch (err: any) {
            toast(err.message)
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="justify-start h-7 md:h-9 font-normal w-full p-2">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create room</DialogTitle>
                    <DialogDescription>
                        Fill in the form to create a new room.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="price">Price</Label>
                        <Input type="number" required id="price" value={roomForm.price} onChange={handleChange} name="price" placeholder="Enter price" />
                    </div>
                    <div className="space-y-1 flex flex-col">
                        <Label>Room Type</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="overflow-hidden capitalize justify-start"
                                >
                                    {roomForm.type !== '' ? roomForm.type : 'Select type'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <DropdownMenuRadioGroup value={roomForm.type}
                                    onValueChange={(newValue) => setRoomForm({ ...roomForm, type: newValue })}>
                                    <DropdownMenuRadioItem value='double'>Double</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='single'>Single</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='suite'>Suite</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="room_number">Room Number</Label>
                        <Input type="number" required id="room_number" value={roomForm.room_number} onChange={handleChange} name="room_number" placeholder="Enter room number" />
                    </div>
                    <div className="space-y-1 flex flex-col">
                        <Label>Status</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="overflow-hidden capitalize justify-start"
                                >
                                    {roomForm.status !== '' ? roomForm.status : 'Select status'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <DropdownMenuRadioGroup value={roomForm.status}
                                    onValueChange={(newValue) => setRoomForm({ ...roomForm, status: newValue })}>
                                    <DropdownMenuRadioItem value='available'>Available</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='booked'>Booked</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='maintenance'>Maintenance</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} type="submit">
                        {loading ? <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </> : 'Submit'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}