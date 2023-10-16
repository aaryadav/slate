import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import UserIcon from "@/public/usericon.svg"

import { User } from "@prisma/client"

interface UserAvatarProps {
    user: User
}
export function UserAvatar({ user }: UserAvatarProps) {
    return (
        <Avatar>
            {user.image ? (
                <AvatarImage alt="Picture" src={user.image} />
            ) : (
                <AvatarFallback>
                    <Image
                        src={UserIcon}
                        alt={"AY"}
                    />
                </AvatarFallback>
            )}
        </Avatar>
    )
}