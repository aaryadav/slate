import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const headers = request.headers;
    const users = await prisma.user.findMany({
        include: {
            tasks: true,
        }
    })

    return NextResponse.json({ users })
}