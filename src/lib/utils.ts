import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onCloseApp = () => window.ipcRenderer.send("closeApp")

const httpsClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
})

export const fetchUserProfile = async (clerkId: string) => {
  try {
    const response = await httpsClient.get(`/auth/${clerkId}`, {
      headers: {
        "Content-Type" : "application/json",
      }
    })
  
    if(response)return response.data
    return null
  } catch (error) {
    return null
  }
}

export const getMediaSources =async () => {
  const displays = await window.ipcRenderer.invoke("getSources")
  const enumurateDevices = await window.navigator.mediaDevices.enumerateDevices()
  const audioInputs = enumurateDevices.filter((device) =>device.kind === "audioinput" )

  console.log("getting sources")
  return { displays, audio: audioInputs }
}

export const updateStudioSettings =async (
  id: string,
  screen: string,
  audio: string,
  preset: "HD" | "SD"
) => {
  try {
    const response = await httpsClient.post(`/studio/${id}`,{
      screen,
      audio,
      preset,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("settings studo : ",response.data)
    if(response)
      return response.data
    return null
  } catch (error) {
    return null
  }
}

