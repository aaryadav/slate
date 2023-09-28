```
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'
import { comment } from 'postcss';

const prisma = new PrismaClient();

// create new task bleh
export async function POST(request: Request) {
    const { title, status, ownerId, groupId, comments, tags } = await request.json()

    const newTask = await prisma.task.create({
        data: {
            title: title,
            status: status,
            ownerId: ownerId,
            groupId: groupId,
            comments: {
                create: comments,
            },
            tags: {
                connectOrCreate: tags.map(tag => ({
                    where: { name: tag.name },
                    create: { name: tag.name }
                }))
            }
        }
    })
    console.log("Added new task successfully!")

    return NextResponse.json({ newTask })

}

```