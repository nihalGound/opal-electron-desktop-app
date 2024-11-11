import { SignedOut, SignInButton, SignOutButton} from "@clerk/clerk-react"
import { Button } from "../../button"

const AuthButton = () => {
  return (
    <SignedOut>
        <div className="flex gap-x-3 h-screen justify-center items-center">
            <SignInButton>
                <Button
                    variant="outline"
                    className="px-10 rounded-full hover:bg-gray-200"
                >
                    Sign In
                </Button>
            </SignInButton>
            <SignOutButton>
                <Button
                    variant="default"
                    className="px-10 rounded-full"
                >
                    Sign Up
                </Button>
            </SignOutButton>
        </div>
    </SignedOut>
  )
}

export default AuthButton