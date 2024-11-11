import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react"
import Loader from "../Loader"
import { useEffect, useState } from "react"
import { fetchUserProfile } from "@/lib/utils"
import { useMediaSources } from "@/hooks/useMediaSources"
import MediaConfigration from "../MediaConfiguration"

const Widget = () => {
    const { user } = useUser()
    const { state, fetchMediaResources } = useMediaSources()
    const [profile,setProfile] = useState<{
        status: number
        user: 
        | ({
            subscription: {
                plan: "PRO" | "FREE"
            } | null
            studio: {
                id: string
                screen: string | null
                mic: string | null
                preset: "HD" | "SD"
                camera: string | null
                userId: string | null
            } | null
        } & {
            id: string
            email: string
            firstname: string | null
            lastname: string | null
            createdAt: Date
            clerkid: string
        })
        | null
    } | null>(null)


    useEffect(() => {
        if (user && user.id) {
            fetchUserProfile(user.id).then(p => setProfile(p))
            console.log(profile)
        }
    },[user])
  return (
    <div className="p-5">
        <ClerkLoading>
            <div className="h-full flex justify-center items-center">
                <Loader />
            </div>
        </ClerkLoading>
        <SignedIn>
            {profile ? (<MediaConfigration state={state} user={profile.user} />) :(
                <div className="w-full h-full flex justify-center items-center">
                    {profile}hello
                </div>
            )}
        </SignedIn>
    </div>
  )
}

export default Widget