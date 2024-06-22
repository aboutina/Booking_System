import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/api';

function useAuth() {
    const [auth, setAuth] = React.useState(false)
    const [token, setToken] = React.useState(null)
    const [role, setRole] = React.useState('')
    const [id , setId] = React.useState('')
    const router = useRouter()


    React.useEffect(() => {
        const fetch = async () => {
            const token = Cookies.get('authtoken');
        const id = localStorage.getItem('user');
        if (token && id) {
            setToken(token);
            setAuth(true);
            setId(id)
            const res = await getUser(id)
            if(res){
                setRole(res.role)
            }
        } else {
            console.log(router)
            if (router.pathname !== '/rooms') {
                // router.push('/')
            }
            setAuth(false);
        }
        }
        fetch()
    }, [])

    return { auth, token , role , id}
}

export default useAuth