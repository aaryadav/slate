// All groups a user is part of 

import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {

    const headers = request.headers;
    const id = params.id;
    const groups = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            groups: true,
        },
    });

    return NextResponse.json(groups)
}