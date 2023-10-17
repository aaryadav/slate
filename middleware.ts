import { NextRequest } from 'next/server'
import { getSession } from 'next-auth/react';


// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: '/api/:function*',
}

const isAuthenticated = async (req) => {
    const requestForNextAuth = {
        headers: {
            cookie: req.cookies,
        },
    };

    const session = await getSession({ req: requestForNextAuth });
    return !!session;
}

export async function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    const session = await isAuthenticated(request)
    if (!session) {
        return Response.json(
            { success: false, message: 'authentication failed' },
            { status: 401 }
        )
    }
}