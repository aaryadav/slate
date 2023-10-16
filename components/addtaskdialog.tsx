import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils';
import { User } from "@prisma/client"
import { HandleTaskCreated } from "@/components/content"

import { DatePicker } from "@/components/datepicker"
import { Plus } from 'lucide-react'

interface AddTaskDialogProps {
    user: User,
    onTaskCreated: HandleTaskCreated
}

enum TaskStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
}

const AddTaskDialog = ({ user, onTaskCreated }: AddTaskDialogProps) => {
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
    const [dueAt, setDueAt] = useState<Date>(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
    });

    console.log('In Parent: ', dueAt);


    const [open, setOpen] = useState(false);

    const handleDateChange = (date: Date) => {
        setDueAt(date);
    };

    const handleStatusChange = (value: TaskStatus) => {
        switch (value) {
            case 'TODO':
                setStatus(TaskStatus.TODO);
                break;
            case 'DOING':
                setStatus(TaskStatus.DOING);
                break;
            case 'DONE':
                setStatus(TaskStatus.DONE);
                break;
            default:
                setStatus(TaskStatus.TODO);
        }
    };

    const handleTaskCreation = async () => {
        const ownerId = user.id;
        const groupId = 1;

        const response = await fetch('/api/task/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, status, dueAt, ownerId, groupId }),
        });

        const responseData = await response.json();
        onTaskCreated(responseData);
        setOpen(false);
    };

    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Label
                        className={`
                        quick-add inline-flex items-center cursor-pointer
                        px-4 py-2 rounded-md 
                        bg-black text-white
                        `}
                    >
                        Add Task &ensp;
                        <Plus size={20} />
                    </Label>
                </DialogTrigger>
                <DialogContent className={`${cn("w-[340px] rounded-lg md:w-full md:max-h-auto")}`}>
                    <DialogHeader>
                        <DialogTitle className='mb-4'>Add New Task</DialogTitle>
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
                                    defaultValue="TODO"
                                    onValueChange={(e) => {
                                        handleStatusChange(e as TaskStatus)
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
                    <div className='absolute bottom-4 right-4'>
                        <Button onClick={handleTaskCreation}>
                            OK
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { AddTaskDialog }