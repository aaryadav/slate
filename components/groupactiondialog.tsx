import React from 'react'
import { useState } from 'react'

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-react'

import { cn } from "@/lib/utils"

import { User } from "@prisma/client"
import { HandleTaskCreated } from "@/components/content"

interface GroupActionDialogProps {
    user: User,
    onTaskCreated: HandleTaskCreated
}

const GroupActionDialog = ({ user, onTaskCreated }: GroupActionDialogProps) => {

    const [name, setName] = useState('');
    const [inviteKey, setinviteKey] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const createGroup = async () => {
        const adminId = user.id;

        const response = await fetch('/api/group/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, adminId }),
        });

        const responseData = await response.json();
        const receivedinviteCode = responseData.newGroup.inviteCode;
        onTaskCreated(responseData);
        setMessage(`🔑 Invite Code: ${receivedinviteCode}`)
        // setOpen(false);
    }

    const joinGroup = async () => {
        const userId = user.id;

        console.log(userId);
        console.log(inviteKey);
        const response = await fetch('/api/group/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, inviteKey }),
        });

        const responseData = await response.json();
        onTaskCreated(responseData);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger>
                <div className="option rounded-full p-2 bg-indigo-100">
                    <Plus className='text-indigo-500' />
                </div>
            </DialogTrigger>
            <DialogContent className={cn(`w-[190px] py-20 px-10`)}>
                <Input
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    placeholder="Enter Group Name"
                />
                <Button
                    variant={"outline"}
                    onClick={createGroup}
                >
                    Create Group
                </Button>
                {message}
                <br />OR <br />
                <Input
                    placeholder="Join using invite code"
                    value={inviteKey}
                    onChange={(e) => { setinviteKey(e.target.value) }}
                />
                <Button
                    variant={"outline"}
                    onClick={joinGroup}
                >
                    Join Group
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export { GroupActionDialog }