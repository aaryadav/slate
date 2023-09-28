"use client"

import Image from 'next/image'
import Link from 'next/link'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { cn } from '@/lib/utils';

import GreenDot from '@/public/green.svg'
import YelloDot from '@/public/yello.svg'


const TaskCard = ({ user }: any) => {
    return (
        <Card
            className={`${cn("w-[380px]")} big-card`}
            key={user.id}
        >
            <Link href={`/kanban/${user.id}`}>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="task-section">
                        <div className="task-state flex">
                            <Image src={GreenDot} alt='' />
                            &ensp;IN PROGRESS
                        </div>
                        <div className="tasks">
                            <ul className="task-list">
                                {user.tasks.map((task: any) => (
                                    task.status === "DOING" ? (
                                        <li key={task.id}>
                                            <label htmlFor={`task-${task.id}`} className="ml-2">{task.title}</label>
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div className="task-section">
                        <div className="task-state flex ">
                            <Image src={YelloDot} alt='' />
                            &ensp;TO DO
                        </div>
                        <div className="tasks">
                            <ul className="task-list">
                                {user.tasks.map((task: any) => (
                                    task.status == "TODO" ? (
                                        <li key={task.id}>
                                            <label htmlFor={`task-${task.id}`} className="ml-2">{task.title}</label>
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                </CardFooter>
            </Link>
        </Card>
    )
}

export { TaskCard }