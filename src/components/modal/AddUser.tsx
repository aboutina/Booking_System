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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { useCreateBooking } from "../hooks/useCreateBooking"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import useRegisterUser from "../hooks/useCreateUser"
import { User } from "@/lib/interface"
import { toast } from "sonner"

export function AddUser() {
    const [userForm, setUserForm] = useState({
        name: '',
        email: "",
        password: "",
        role: "guest",
    })
    const [phone, setPhone] = useState<string>()
    const { registerUser, loading } = useRegisterUser()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await registerUser(userForm as User, phone as string)
        if (res) {
            setUserForm({
                name: '',
                email: '',
                password: '',
                role: 'guest',
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-7 md:h-9 ">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Now</DialogTitle>
                    <DialogDescription>
                        Set the check in and check out dates.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input type="email" required id="name" value={userForm.name} onChange={handleChange} name="name" placeholder="Enter name" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" required id="email" value={userForm.email} onChange={handleChange} name="email" placeholder="a@gmail.com" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" required id="password" value={userForm.password} onChange={handleChange} name="password" placeholder="********" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input type="number" required id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" placeholder="Enter phone number" />
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