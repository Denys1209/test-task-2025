import User from '@/types/models/User'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

const UserCard = (
    { user }: { user: User }
) => {
    return (
        <Link href={`/users/${user.id}`} className='group block' >
            <Card className='bg-white transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-white group-hover:brightness-75'>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Email: {user.email}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default UserCard;