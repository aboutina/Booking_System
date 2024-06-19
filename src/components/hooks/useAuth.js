import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function useAuth() {
    const [auth, setAuth] = React.useState(false)
    const [token, setToken] = React.useState(null)
    const [id, setId] = React.useState(null)
    const router = useRouter()

    React.useEffect(() => {
        const token = Cookies.get('authtoken');
        const id = localStorage.getItem('user');
        if (token && id) {
            setToken(token);
            setAuth(true);
            setId(id);
        } else {
            console.log(router)
            if (router.pathname !== '/rooms') {
                // router.push('/')
            }
        }
    }, [])

    return { auth, token, id }
}

export default useAuth