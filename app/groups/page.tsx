'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import { getCurrentUser } from "@/lib/session"
import { useSession } from 'next-auth/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Groups = () => {

    const { data: session, status } = useSession();

    const user = session?.user;
    const userId = (user as any)?.id;

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/groups/${userId}`);
            const data = await response.json();
            const groupData = data.groups;
            setGroups(groupData);
        };
        fetchData();

    })
    return (
        <div className="groups">
            <div className="page-title font-bold text-2xl mb-8">
                Groups
            </div>
            {groups.map((group: any) => (
                <Card
                    className="big-card group-card w-full md:w-[380px] md:max-h-[520px]  relative"
                    key={group.id}
                >
                    <CardHeader>
                        <CardTitle>{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {group.memberCount}&ensp; members
                    </CardContent>
                </Card>
            ))
            }
        </div >
    )
}

export default Groups