'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { DialogContent, DialogTrigger, Dialog } from "../ui/dialog"
import { createUser } from "@/lib/api"
import Cookies from 'js-cookie';
import { User } from "@/lib/interface"

function LoginPage() {
    const [userForm, setUserForm] = useState({
        name: '',
        email: "",
        password: "",
        role: "guest",
    })
    const [phone, setPhone] = useState<string>()
    const router = useRouter()

    const login = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!userForm.email || !userForm.password) {
            toast("Error", {
                description: 'Email and password are required',
            })
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: userForm.email,
                password: userForm.password,
            })
            if (response.status === 200) {
                console.log(response.data.id)
                localStorage.setItem('user', response.data.id)
                Cookies.set('authtoken', response.data.token, { secure: true, sameSite: 'strict' });
                toast('Login Success!')
            }
        } catch (error: any) {
            toast(error.response.statusText)
            console.log(error)
        }
    }

    const register = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!userForm.email || !userForm.password) {
            toast("Error", {
                description: 'Email and password are required',
            })
            return;
        }
        try {
            const newForm = {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                phone_number: phone,
                role: 'guest',
            }
            const res = await createUser(newForm as User)
            if (res) {
                toast('Register Successfully!')
            }
        } catch (error: any) {
            toast(error.response.data.message)
            console.log(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-7 md:h-9 mt-3">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                    <Tabs defaultValue="login" >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Sign In</TabsTrigger>
                            <TabsTrigger value="register">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign In</CardTitle>
                                    <CardDescription>
                                        Enter your email and password belew
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" required id="email" value={userForm.email} onChange={handleChange} name="email" placeholder="a@gmail.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" required id="password" value={userForm.password} onChange={handleChange} name="password" placeholder="*******" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={login}>Submit</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign Up</CardTitle>
                                    <CardDescription>
                                        Fill up the form below
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
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
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={register}>Submit</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginPage