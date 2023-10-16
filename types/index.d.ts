import { Prisma } from '@prisma/client'

// Define the query payload shape.
export const userWithTasks = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { tasks: true },
})

// Define a new TypeScript type.
export type UserWithTasks = Prisma.UserGetPayload<typeof userWithTasks>