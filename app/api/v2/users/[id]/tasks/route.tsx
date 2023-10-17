import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

enum Status {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE",
    ALL = "ALL"
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const ownerId = params.id
    const searchParams = request.nextUrl.searchParams
    const statusQuery = (searchParams.get('sort') ?? "").toUpperCase() as Status | null;

    // Validate statusQuery against the enum values
    if (statusQuery && !Object.values(Status).includes(statusQuery)) {
        return NextResponse.json({ error: 'Invalid status value' });
    }

    console.log(statusQuery)

    const statusCondition = (statusQuery && statusQuery !== Status.ALL) ? { status: statusQuery } : {};

    console.log("Status Condition: ", statusCondition);

    const tasks = await prisma.task.findMany({
        where: {
            ownerId: ownerId,
            ...statusCondition
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] ?? [];
        acc[task.status].push(task);
        return acc;
    }, {} as Record<Status, Array<any>>)

    return NextResponse.json({ groupedTasks })

}