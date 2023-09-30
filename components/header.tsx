"use client"
import Link from 'next/link'
import Image from 'next/image'

import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { UserAvatar } from "@/components/useravatar"
import SlateIcon from "@/public/slate.svg"

const Header = () => {

    const { data: session, status } = useSession();
    const user = session?.user;
    return (
        <div className="navbar">
            <div className="menu-options">
                <Link href="/" className='inline-flex items-baseline space-x-1'>
                    <Image src={SlateIcon} alt={''} className='w-5' />
                    <div className='font-bold text-xl'>slate</div>
                </Link>
            </div>
            {user ? (
                <div className="user-options">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <UserAvatar
                                user={{ name: user.name || null, image: user.image || null }}
                                className="border border-black h-8 w-8"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {user.name && <p className="font-medium">{user.name}</p>}
                                    {user.email && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={(event) => {
                                    event.preventDefault()
                                    signOut()
                                }}
                            >
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export { Header }