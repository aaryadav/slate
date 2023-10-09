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

export async function GET(request: Request, { params }: { params: { id: string } }) {

    const headers = request.headers;
    const groupId = params.id;

    const users = await prisma.user.findMany({
        where: {
            groups: {
                some: {
                    id: parseInt(groupId),
                },
            },
        },
        include: {
            tasks: true,
        },
    })

    const groupedTasks = groupTasksByStatus(users);

    return NextResponse.json({ groupedTasks })
}