import { PrismaClient } from '@prisma/client'
import Error from 'next/error';

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
    try {
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

        return Response.json({ groupedTasks }, {
            status: 200
        })

    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 })
    }

}