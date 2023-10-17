import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const generateInviteCode = (name: string) => {
    const inviteCodeBase = name.split(' ').join('').toLowerCase();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    return `${inviteCodeBase}-${randomNumber}`;
}

export async function POST(request: NextRequest) {

    try {
        const { name, adminId } = await request.json()

        // Validate inputs
        if (!name || !adminId) {
            return Response.json({ error: "Invalid inputs" }, { status: 400 });
        }

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

        return Response.json({ newGroup }, { status: 201 });

    } catch (error) {
        console.error('Error creating a new group: ', error);
        return Response.json({ error: "Failed to create group" }, { status: 500 });
    }
}
