"use client"

import UserService from '@/services/UserService';
import User from '@/types/models/User';
import LoadingState from '@/types/shared/LoadingState';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, MapPin, Phone, Globe, Building2, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const userService = new UserService();
    const unwrappedParams = React.use(params);
    const [error, setError] = useState<string>();
    const [state, setState] = useState<LoadingState>('Loading');
    const [user, setUser] = useState<User>();

    const loadUserData = () => {
        if (!Number.isInteger(Number(unwrappedParams.id))) {
            setState("Error");
            setError("Id must be an integer");
            return;
        }

        setState("Loading");

        userService.getById(Number(unwrappedParams.id))
            .then(value => {
                setUser(value);
                setState("Idle");
            })
            .catch((ex) => {
                setError(ex.message);
                setState("Error");
            });
    };

    useEffect(() => {
        loadUserData();
    }, [unwrappedParams.id]);



    return (
        <div className="container mx-auto py-8 text-white px-4">
            <Link href={'/'}>
                <Button
                    variant="outline"
                    className="mb-6 cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
            </Link>

            {state === "Loading" && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading user data...</span>
                </div>
            )}

            {state === "Error" && (
                <div className="space-y-4">
                    <Alert variant="destructive" className="mb-2">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            <p>{error || "An unknown error occurred while fetching the user data."} </p>
                            <div className="flex justify-center">
                                <Button
                                    onClick={loadUserData}
                                    variant="outline"
                                className="mb-6 cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-white"
                                >
                                    <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>

                </div>
            )}

            {state === "Idle" && user && (
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>@{user.username}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                            <Separator className="mb-4" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <div className="bg-muted p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-muted p-2 rounded-full mr-3">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Phone</p>
                                        <p className="font-medium">{user.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-muted p-2 rounded-full mr-3">
                                        <Globe size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Website</p>
                                        <p className="font-medium">{user.website}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Address</h3>
                            <Separator className="mb-4" />

                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{user.address.street}, {user.address.suite}</p>
                                    <p>{user.address.city}, {user.address.zipcode}</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Geo: {user.address.geo.lat}, {user.address.geo.lng}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Company</h3>
                            <Separator className="mb-4" />

                            <div className="flex items-start">
                                <Building2 className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{user.company.name}</p>
                                    <p className="italic">&ldquo;{user.company.catchPhrase}&rdquo;</p>
                                    <p className="text-sm text-muted-foreground mt-1">{user.company.bs}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default Page;