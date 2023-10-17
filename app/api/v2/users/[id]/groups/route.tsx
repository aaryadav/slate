import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handleError = (error: any, message: string) => {
    console.error(message, error);
    return Response.json({ error: message }, { status: 500 });
};

// Fetch all groups a user is part of
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        
        // Find the user and include their groups
        const userWithGroups = await prisma.user.findUnique({
            where: { id },
            include: {
                groups: true,
            },
        });

        // Check if the user is found
        if (!userWithGroups) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // Return only the groups of the user
        return Response.json({ groups: userWithGroups.groups });
    } catch (error) {
        return handleError(error, 'Error retrieving groups for the user');
    }
}
