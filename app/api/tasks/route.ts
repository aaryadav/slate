import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

function groupTasksByStatus(users: any) {
    return users.map((user: any) => ({
        ...user,
        tasks: user.tasks.reduce((acc: any, task: any) => {
            acc[task.status] = acc[task.status] ?? [];
            acc[task.status].push(task);
            return acc;
        }, {})
    }));
}

export async function GET(request: Request) {
    const headers = request.headers;
    const users = await prisma.user.findMany({
        include: {
            tasks: true,
        }
    })

    const groupedTasks = groupTasksByStatus(users);

    return NextResponse.json({ groupedTasks })
}