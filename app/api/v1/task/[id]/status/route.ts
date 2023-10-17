import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Status {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const taskId = params.id;
    const { status } = await request.json();
    const newStatus = status as Status;

    // Validate newStatus against enum values
    if (!Object.values(Status).includes(newStatus)) {
        return NextResponse.json({ error: 'Invalid status value' });
    }

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { status: newStatus },
    });

    return NextResponse.json(updatedTask);
}
