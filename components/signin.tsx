"use client"

import Image from 'next/image';

import { signIn } from "next-auth/react"
import GoogleLogo from "@/public/google.svg"

const SignIn = () => {
    return (
        <button
            onClick={() => signIn('google')}
            className="signin-button flex flex-row items-center border border-zinc-400 rounded px-3 py-2 mt-4 b w-fit"
        >
            <div className="text">
                Login
            </div>
            <Image
                className='inline-flex ml-2'
                src={GoogleLogo}
                alt="Follow us on Twitter"
            />
        </button>
    )
}

export { SignIn }