import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Read the task based on id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    const task = await prisma.task.findUnique({
        where: {
            id: id,
        },
        include: {
            comments: true,
            tags: true,
        }
    })
    return NextResponse.json({ task })
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {

    const taskId = params.id;
    const { title, status, dueAt, ownerId, groupId } = await request.json()

    const updatedTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            title,
            status,
            dueAt,
        }
    })

    return NextResponse.json({ updatedTask })
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const taskId = params.id;

    const deletedTask = await prisma.task.delete({
        where: { id: taskId },
    });

    return NextResponse.json({ deletedTask });
}
