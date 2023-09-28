import Image from "next/image"
import HeartIcon from "@/public/heart.svg"

const Footer = () => {
    return (
        <div className="footer">
            Made with &nbsp;<Image src={HeartIcon} alt={'<3'} />&nbsp; by Aaryaman.
        </div>
    )
}

export { Footer }