import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const handleError = (error: any, message: string) => {
    console.error(message, error);
    return Response.json({ error: message }, { status: 500 });
};

// Read the task based on id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                comments: true,
                tags: true,
            }
        });

        if (!task) {
            return Response.json({ error: 'Task not found' }, { status: 404 });
        }

        return Response.json({ task });
    } catch (error) {
        return handleError(error, 'Error retrieving the task');
    }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {

    try {
        const { id } = params;
        const { title, status, dueAt } = await request.json();

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, status, dueAt }
        });

        return Response.json({ updatedTask });
    } catch (error) {
        return handleError(error, 'Error updating the task');
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const deletedTask = await prisma.task.delete({
            where: { id: id },
        });

        return Response.json({ deletedTask });

    } catch (error) {
        return handleError(error, 'Error deleting the task');
    }
}
