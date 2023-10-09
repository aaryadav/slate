import React from 'react'

const DueDate = ({ task }: any) => {
    const date = new Date(task.dueAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);

    return (
        <p className='flex w-[75px] justify-center white-space-nowrap font-medium text-zinc-600 p-2 border rounded-md'>
            {formattedDate}
        </p>
    );
};

export { DueDate }

