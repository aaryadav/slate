import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import UserIcon from "@/public/usericon.svg"

export function UserAvatar({ user, ...props }: any) {
    return (
        <Avatar {...props}>
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