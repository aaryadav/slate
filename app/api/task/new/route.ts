import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// create new task
export async function POST(request: Request) {
    const { title, status, ownerId, groupId } = await request.json()

    const newTask = await prisma.task.create({
        data: {
            title: title,
            status: status,
            ownerId: ownerId,
            groupId: groupId,
        }
    })

    return NextResponse.json({ newTask })

}
