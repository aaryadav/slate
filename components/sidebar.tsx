"use client";

import { useState, useEffect } from 'react';

// import { User } from "next-auth"
import { UserWithTasks as User } from '@/types';
import { Task, Group } from "@prisma/client"
import { FetchData, HandleTaskCreated } from "@/components/content"

import { GroupActionDialog } from "@/components/groupactiondialog"

interface SidebardProps {
    signedInUser: User,
    groups: Group[],
    onTaskCreated: HandleTaskCreated,
    fetchData: FetchData
}

import { useSession } from 'next-auth/react';


const Sidebar = () => {
    const { data: session, status } = useSession();

    const signedInUser = session?.user as User;


    const [tasks, setTasks] = useState<Task[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);

    const handleTaskCreated: HandleTaskCreated = (newTask) => {
        setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    };

    useEffect(() => {
        const fetchGroupData = async () => {
            const response = await fetch(`/api/user/groups/${signedInUser.id}`);
            const data = await response.json();
            const groupData = data.groups;
            setGroups(groupData);
        };
        fetchGroupData();

    }, [signedInUser]);



    const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

    useEffect(() => {
        if (groups.length > 0 && activeGroupId === null) {
            setActiveGroupId(groups[0].id);
        }
    }, [groups, activeGroupId]);

    const handleGroupClick = (groupId: number) => {
        setActiveGroupId(groupId);
    }

    return (
        <div className='border-r bg-white left-0 top-20 px-4 py-10 space-y-8 w-[200px] h-full fixed'>
            <div className="sidebar-meta font-bold mb-5 flex justify-between items-center">
                <div className="title">Groups</div>
                <GroupActionDialog
                    user={signedInUser}
                />

            </div>

            <div className="flex flex-col groups space-y-6">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        onClick={() => handleGroupClick(group.id)}
                        className={`group-container ${group.id === activeGroupId ? 'active' : ''}`}
                    >
                        <div
                            className={`group relative cursor-pointer px-4 py-2 rounded-lg bg-indigo-100`}
                        >
                            {group.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Sidebar }