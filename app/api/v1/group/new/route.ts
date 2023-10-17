import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const generateInviteCode = (name: any) => {
    const inviteCodeBase = name.split(' ').join('').toLowerCase();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    return `${inviteCodeBase}-${randomNumber}`;
}

export async function POST(request: Request) {

    const { name, adminId } = await request.json()

    try {
        const inviteCode = generateInviteCode(name);

        // Create a new group
        const newGroup = await prisma.group.create({
            data: {
                name: name,
                adminId: adminId,
                inviteCode: inviteCode,
                members: {
                    connect: {
                        id: adminId,
                    },
                },
            },
        });

        return NextResponse.json({ newGroup });


    } catch (error) {
        console.error('Error creating a new group: ', error);
        throw error;
    }
}
