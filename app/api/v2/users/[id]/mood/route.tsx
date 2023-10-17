import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handleError = (error: any, message: string) => {
    console.error(message, error);
    return Response.json({ error: message }, { status: 500 });
};

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { mood } = await request.json();

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { mood }
        });

        if (!updatedUser) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json({ updatedUser });
    } catch (error) {
        return handleError(error, 'Error updating user mood');
    }
}
