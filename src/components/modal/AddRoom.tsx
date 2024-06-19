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
import { createRoom } from "@/lib/api"

export function AddRoom() {
    const [roomForm, setRoomForm] = useState({
        type: '',
        price: 0,
        status: "available",
        img: '',
    })
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
        if (!roomForm.img) {
            toast('Please select an image file');
            return;
        }
        setLoading(true)
        try {
            // Create a FormData object
            const formData = new FormData();

            // Append all form fields to formData
            Object.keys(roomForm).forEach((key) => {
                let value = roomForm[key as keyof typeof roomForm];
                if (typeof value === 'number') {
                    value = value.toString();
                }
                if (key === 'img') {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.toString());
                }
            });
            // Send formData instead of roomForm
            const res = await createRoom(formData, token as string)
            if (res) {
                setLoading(false)
                toast('Room created successfully')
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
                <Button className="h-7 md:h-9 ">Add Room</Button>
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
                    <div className="space-y-1">
                        <Label htmlFor="img">Image</Label>
                        <Input type="file" required id="img" onChange={handleChange} name="img" placeholder="a@gmail.com" accept=".jpeg,.jpg,.png,.gif,.svg" />
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