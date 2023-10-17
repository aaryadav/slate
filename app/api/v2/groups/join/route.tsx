import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(request: Request) {

    try {
        const { userId, inviteCode } = await request.json()

        // Validate inputs
        if (!userId || !inviteCode) {
            return Response.json({ error: "Invalid inputs" }, { status: 400 });
        }

        // Find group by invite code
        const group = await prisma.group.findUnique({
            where: {
                inviteCode: inviteCode,
            },
        });

        // If no group found, return an error
        if (!group) {
            return Response.json({ error: "Group not found" }, { status: 404 });
        }

        // Check if user is already a member of the group
        const isMember = await prisma.user.findFirst({
            where: {
                id: userId,
                groups: {
                    some: {
                        id: group.id,
                    },
                },
            },
        });

        if (isMember) {
            return Response.json({ error: "User is already a member of this group" }, { status: 400 });
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

        return Response.json({ group });

    } catch (error) {
        console.error('Error joining the group: ', error);
        return Response.json({ error: "Failed to join group" }, { status: 500 });
    }
}
