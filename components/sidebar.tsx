import { useState, useEffect } from 'react';

import Link from 'next/link'
import { GroupActionDialog } from "@/components/groupactiondialog"

const Sidebar = ({ signedInUser, groups, onTaskCreated, fetchData }: any) => {
    const user = signedInUser;


    const [activeGroupId, setActiveGroupId] = useState(null);

    useEffect(() => {
        if (groups.length > 0 && activeGroupId === null) {
            setActiveGroupId(groups[0].id);
        }
    }, [groups, activeGroupId]);

    const handleGroupClick = (groupId: any) => {
        fetchData(groupId);
        setActiveGroupId(groupId);
    }

    return (
        <div className='border-r bg-white left-0 top-20 px-4 py-10 space-y-8 w-[200px] h-full fixed'>
            <div className="sidebar-meta font-bold mb-5 flex justify-between items-center">
                <div className="title">Groups</div>
                <GroupActionDialog
                    user={signedInUser}
                    onTaskCreated={onTaskCreated}
                />

            </div>

            <div className="flex flex-col groups space-y-6">
                {groups.map((group: any) => (
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