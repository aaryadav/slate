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

import { cn } from '@/lib/utils';

import { MoreHorizontal } from 'lucide-react'


const EditTaskDialog = ({ task, onTaskCreated }: any) => {
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <li key={task.id}
                        className={`w-full inline-flex items-center justify-between
                                                group p-1 rounded
                                                cursor-pointer hover:bg-indigo-50/70`}>
                        <div className="task-label">
                            <label
                                htmlFor={`task-${task.id}`}
                                className="ml-2"
                            >
                                {task.title}
                            </label>
                        </div>
                        <div className="task-tools opacity-0 group-hover:opacity-100">
                            <MoreHorizontal size={15} color='#6e6e6e' />
                        </div>
                    </li>
                </DialogTrigger>
                <DialogContent className={`${cn("w-[340px] h-[650px] rounded-lg md:w-auto md:max-h-auto")}`}>
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
