import Profile from '@/components/sections/Profile'
import { getUser } from '@/lib/api'
import React from 'react'

async function page({ params }: { params: { slug: string } }) {
    const data = await getUser(params.slug)
    return (
        <Profile data={data} />
    )
}

export default page