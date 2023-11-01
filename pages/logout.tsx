import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "../firebase"

export default function Logout() {
  const router = useRouter()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push("/")
    })
    .catch((error) => {
      console.log("error", error)
    })

  return <></>
}
