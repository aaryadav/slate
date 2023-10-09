import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(request: Request) {

    const { userId, inviteCode } = await request.json()

    try {
        // Find group by invite code
        const group = await prisma.group.findUnique({
            where: {
                inviteCode: inviteCode,
            },
        });

        // If no group found, throw an error
        if (!group) {
            throw new Error('Group not found');
        }

        // Add user to group
        await prisma.group.update({
            where: {
                id: group.id,
            },
            data: {
                members: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return NextResponse.json({ group });


    } catch (error) {
        console.error('Error joining the group: ', error);
        throw error;
    }
}
