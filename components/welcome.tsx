import { SignIn } from "@/components/signin"

const Welcome = () => {
    return (
        <div className="welcome">
            Hi! <br />
            Welcome to Slate.<br />
            Track and share your progress with friends.<br />
            <SignIn/>
        </div>
    )
}

export { Welcome }