import { type NextRequest } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Status {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE",
    ALL = "ALL"
}

const handleError = (error: any, message: string) => {
    console.error(message, error);
    return Response.json({ error: message }, { status: 500 });
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: ownerId } = params;
        const statusQuery = (request.nextUrl.searchParams.get('sort') ?? "").toUpperCase() as Status;

        // Validate statusQuery against the enum values
        if (statusQuery && !Object.values(Status).includes(statusQuery)) {
            return Response.json({ error: 'Invalid status value' }, { status: 400 });
        }

        const statusCondition = (statusQuery && statusQuery !== Status.ALL) ? { status: statusQuery } : {};

        const tasks = await prisma.task.findMany({
            where: {
                ownerId,
                ...statusCondition
            }
        });

        const groupedTasks = tasks.reduce((acc, task) => {
            acc[task.status] = acc[task.status] ?? [];
            acc[task.status].push(task);
            return acc;
        }, {} as Record<Status, Array<any>>);

        return Response.json({ groupedTasks });
    } catch (error) {
        return handleError(error, 'Error fetching tasks');
    }
}
