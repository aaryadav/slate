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

import { DatePicker } from "@/components/datepicker"
import { Plus } from 'lucide-react'

const AddTaskDialog = ({ user, onTaskCreated }: any) => {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [dueAt, setDueAt] = useState(null);

    const [open, setOpen] = useState(false);

    const handleDateChange = (date: any) => {
        setDueAt(date);
    };

    const handleStatusChange = (value: any) => {
        switch (value) {
            case 'TODO':
                setStatus('TODO');
                break;
            case 'DOING':
                setStatus('DOING');
                break;
            case 'DONE':
                setStatus('DONE');
                break;
            default:
                setStatus('TODO');
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
                <DialogContent>
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
                                <DatePicker selectedDate={null} onDateChange={handleDateChange} />
                            </div>
                        </div>
                    </DialogHeader>
                    <div className='absolute bottom-4 right-4'>
                        <Button onClick={handleTaskCreation}>
                            OK
                        </Button>
                    </div>
                </DialogContent>
            </Dialog></>
    )
}

export { AddTaskDialog }