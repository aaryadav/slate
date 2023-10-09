import Image from "next/image"
import HeartIcon from "@/public/heart.svg"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="footer z-50">
            Made with &nbsp;<Image src={HeartIcon} alt={'<3'} />&nbsp; by &nbsp;<u><Link href={"https://aaryadav.github.io/"}>Aaryaman</Link></u>.
        </div>
    )
}

export { Footer }