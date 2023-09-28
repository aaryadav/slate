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


// Update the task based on id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const taskId = params.id;
    const { title, status, ownerId, groupId, comments, tags } = await request.json();

    // Existing comments (those with IDs) for update operation
    const existingComments = comments.filter((comment: any) => comment.id);

    // New comments (those without IDs) for create operation
    const newComments = comments.filter((comment: any) => !comment.id);

    const newTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            title,
            status,
            ownerId,
            groupId,
            // Handle existing comments
            comments: {
                update: existingComments.map((comment: any) => ({
                    where: { id: comment.id },
                    data: { body: comment.body },
                })),
                // Handle new comments
                create: newComments.map((comment: any) => ({
                    body: comment.body,
                })),
            },
            tags: {
                upsert: tags.map((tag: any) => ({
                    where: { name_ownerId: { name: tag.name, ownerId: ownerId } },
                    create: { name: tag.name, ownerId: ownerId },
                    update: { name: tag.name },
                })),
            },
        },
    });

    return NextResponse.json({ newTask });
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const taskId = params.id;

    const deletedTask = await prisma.task.delete({
        where: { id: taskId },
    });

    return NextResponse.json({ deletedTask });
}
