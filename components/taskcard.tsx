"use client"

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { EditTaskDialog } from "@/components/edittaskdialog"
import { AddTaskDialog } from "@/components/addtaskdialog"
import { DueDate } from "@/components/duedate"

import { cn } from '@/lib/utils';

import { X } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import { UserWithTasks as User } from '@/types';

import { Task, Group } from "@prisma/client"
import { HandleTaskCreated } from "@/components/content"

type UserMood = User["mood"]

interface TaskCardProps {
    user: User,
    signedInUser: User,
    onTaskCreated: HandleTaskCreated
}

const TaskCard = ({ user, signedInUser, onTaskCreated }: TaskCardProps) => {

    const isSignedInUser = user.id === signedInUser.id;
    const taskCategories = ["TODO", "DOING", "DONE"];


    const totalTasks = Object.values(user.tasks).flat().length;  // Calculate total number of tasks

    const [mood, setMood] = useState<UserMood>(user.mood);

    const handleMoodUpdate = async (newMood: UserMood) => {
        const response = await fetch(`/api/mood/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mood: newMood }),
        });

        if (response.ok) {
            setMood(newMood);
        } else {
            console.error('Failed to update mood:', await response.text());
        }
    };

    return (
        <Card
            className={`${cn("w-full md:w-[420px] md:max-h-[450px]")} big-card relative`}
            key={user.id}
        >
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <div className="mood-card flex" key="">
                    {mood ? (
                        <div
                            className="current-status min-w-1/2 max-w-full justify-between flex mt-2 space-x-3 items-center px-4 py-2 shadow-lg text-sm rounded-xl"
                            style={{ boxShadow: '0 2px 6px 1px #e0e7ff' }}
                        >
                            <div className="status-text">
                                {mood}
                            </div>
                            {isSignedInUser && (
                                <div
                                    className="status-options cursor-pointer rounded-full"
                                    onClick={() => handleMoodUpdate(null)}
                                >
                                    <X size={15} strokeWidth={1} />
                                </div>
                            )}
                        </div>
                    ) : (
                        isSignedInUser ? (
                            <Input
                                className='rounded-xl w-1/2 mt-2'
                                placeholder='How are you feeling?'
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        handleMoodUpdate((e.target as HTMLInputElement).value);
                                    }
                                }}
                            />
                        ) : null
                    )}
                </div>
            </CardHeader>

            <CardContent
                key={user.id}
                className={`${cn("h-[320px] mb-20")} card-content overflow-auto`}
            >
                {totalTasks === 0 ? (
                    <Label>Clean slate, empty fate. <br /> Add tasks!</Label>
                ) : (
                    taskCategories.map((category: string) => (
                        (user.tasks as any)[category] && (user.tasks as any)[category].length > 0 && (
                            <div className="task-section mb-3" key={category}>
                                <div className="task-state flex items-center font-medium">
                                    {category === "DOING" ? (
                                        <span>🛠️</span>
                                    ) : category === "DONE" ? (
                                        <span>🎉</span>
                                    ) : (
                                        <span>📋</span>
                                    )}
                                    &ensp;{category === "DOING" ? "IN PROGRESS" : category}
                                </div>
                                <div className="tasks">
                                    <ul className="task-list flex flex-col">
                                        {(user.tasks as any)[category].map((task: Task) => (
                                            isSignedInUser ? (
                                                <EditTaskDialog
                                                    page={"home"}
                                                    key={task.id}
                                                    task={task}
                                                    onTaskCreated={onTaskCreated}
                                                />
                                            ) : (
                                                <>
                                                    <div key={task.id}
                                                        className={`task-list-item`}>
                                                        <div className="task-label flex justify-between items-center">
                                                            <label
                                                                htmlFor={`task-${task.id}`}
                                                                className='max-w-[210px]'
                                                            >
                                                                {task.title}
                                                            </label>
                                                            <div className="task-due-date">
                                                                <DueDate task={task} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    ))
                )}
            </CardContent>
            <CardFooter className="flex space-x-4 rounded-br-2xl absolute bottom-0 right-0">
                {isSignedInUser && (
                    <AddTaskDialog
                        user={user}
                        onTaskCreated={onTaskCreated}
                    />
                )}
                <Link href={`/kanban/${user.id}`} className='rounded-full p-2 bg-zinc-100'>
                    <ArrowRight size={20} strokeWidth={1} />
                </Link>
            </CardFooter>
        </Card>
    )
}
export { TaskCard }
