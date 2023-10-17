import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// create new task
export async function POST(request: Request) {
    try {
        const { title, status, dueAt, ownerId, groupId } = await request.json()

        const newTask = await prisma.task.create({
            data: {
                title: title,
                status: status,
                dueAt: dueAt,
                ownerId: ownerId,
                groupId: groupId,
            }
        })
        return Response.json({ newTask }, { status: 201 })

    } catch (error) {
        return Response.json({ error: "Failed to create task" }, { status: 500 })
    }

}
