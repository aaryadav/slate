import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const userId = params.id;
    const { mood } = await request.json();

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            mood: mood
        }
    });

    return NextResponse.json({ updatedUser });
}