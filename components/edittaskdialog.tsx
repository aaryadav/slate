import { Card, CardContent } from '@/components/ui/card';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from "@/components/datepicker";
import { useState, useEffect } from "react";

import { DueDate } from '@/components/duedate';

import { cn } from '@/lib/utils';

import { MoreHorizontal } from 'lucide-react'


const EditTaskDialog = ({ page, task, onTaskCreated }: any) => {

    const [title, setTitle] = useState(task.title);
    const [status, setStatus] = useState(task.status);
    const [dueAt, setDueAt] = useState(task.dueAt);

    const [open, setOpen] = useState(false);

    const handleDateChange = (date: any) => {
        setDueAt(date);
    };

    const handleStatusChange = (value: any) => {
        setStatus(value);
    };

    const handleTaskUpdate = async () => {
        const response = await fetch(`/api/task/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, status, dueAt }),
        });

        const responseData = await response.json();
        onTaskCreated(responseData);
        setOpen(false);
    };

    const handleTaskDeletion = async () => {
        const taskId = task.id;
        const response = await fetch(`/api/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId }),
        });
        onTaskCreated(response);
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} key={task.id}>
                <DialogTrigger>
                    {page === "home" ? (
                        <div key={task.id}
                            className={`task-list-item cursor-pointer`}>
                            <div className="task-label flex justify-between items-center">
                                <label
                                    className='max-w-[210px]'
                                    htmlFor={`task-${task.id}`}
                                >
                                    {task.title}
                                </label>
                                <div className="task-due-date">
                                    <DueDate task={task} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CardContent className="text-left px-2 py-2 space-y-3">
                            <div className="task-title">{task.title}</div>
                            {/* <div className="task-tags space-x-3 flex">
                                {tags.map((tag) => (
                                    <div key={tag} className="tag w-fit rounded-full bg-indigo-300 text-white px-3 py-1">{tag}</div>
                                ))}
                            </div> */}

                        </CardContent>
                    )}
                </DialogTrigger>
                <DialogContent className={`${cn("w-[340px] rounded-lg md:w-full md:max-h-auto")}`}>
                    <DialogHeader>
                        <DialogTitle className='mb-4'>Edit Task</DialogTitle>
                        <div className="dialog-content space-y-6">
                            <div className="task-title">
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Enter Task Title'
                                />
                            </div>
                            <div className="task-status">
                                <RadioGroup
                                    defaultValue={status}
                                    onValueChange={(e) => {
                                        handleStatusChange(e)
                                    }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="TODO" id="option-one" />
                                        <Label htmlFor="option-one">To Do</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="DOING" id="option-two" />
                                        <Label htmlFor="option-two">In Progress</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="DONE" id="option-three" />
                                        <Label htmlFor="option-three">Done</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="task-date">
                                <DatePicker selectedDate={dueAt} onDateChange={handleDateChange} />
                            </div>
                        </div>
                    </DialogHeader>
                    <div className='absolute bottom-4 right-4 space-x-2'>
                        <Button onClick={handleTaskDeletion} variant={"destructive"}>
                            Delete
                        </Button>
                        <Button onClick={handleTaskUpdate}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export { EditTaskDialog };
