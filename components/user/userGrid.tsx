"use client"
import UserService from '@/services/UserService';
import User from '@/types/models/User';
import React, { useEffect, useState } from 'react'
import UserCard from './userCard';
import LoadingState from '@/types/shared/LoadingState';
import UserCardSkeleton from '../skeletons/userCardSkeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';

const UserGrid = () => {
    const router = useRouter();
    const userService = new UserService();
    const [error, setError] = useState<string>();
    const [state, setState] = useState<LoadingState>('Loading');
    const [users, setUsers] = useState<User[]>([]);

    const loadUsers =  () => {
        setState("Loading")
        userService.getAll().then(value => {
            setUsers(value);
            setState("Idle");
        })
            .catch((ex) => {

                setError(ex.message);
                setState("Error");
            })
            ;
    };


    useEffect(() => {
        loadUsers();
    }, []);


    return (
        <>
            {
                state !== "Error" ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            state === "Idle" ?
                                users.map((item, index) => (
                                    <UserCard user={item} key={index} />
                                ))
                                : Array(10).fill(0).map((_, index) => <UserCardSkeleton key={index} />)
                        }
                    </div>
                    : <div className="space-y-4">
                    <Alert variant="destructive" className="mb-2 text-white">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            <p>{error || "An unknown error occurred while fetching the user data."} </p>
                            <div className="flex justify-center">
                                <Button
                                    onClick={loadUsers}
                                    variant="outline"
                                className="mb-6 cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-white"
                                >
                                    <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>

                </div>
            }
        </>
    )
}

export default UserGrid