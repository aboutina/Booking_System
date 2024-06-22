import { useState } from 'react';
import { createUser } from "@/lib/api";
import { User } from "@/lib/interface";
import { toast } from "sonner";

const useRegisterUser = () => {
    const [loading, setLoading] = useState(false);

    const registerUser = async (userForm: Partial<User>, phone: string) => {
        setLoading(true);
        if (!userForm.email || !userForm.password) {
            toast("Error", {
                description: 'Email and password are required',
            })
            setLoading(false);
            return null;
        }
        try {
            const newForm = {
                ...userForm,
                phone_number: phone,
            }
            const res = await createUser(newForm as User)
            if (res) {
                toast('Register Successfully!')
                setLoading(false);
                return res;
            }
        } catch (error: any) {
            toast(error.response.data.message)
            console.log(error)
            setLoading(false);
        }
        return null;
    }

    return { registerUser, loading };
}

export default useRegisterUser;