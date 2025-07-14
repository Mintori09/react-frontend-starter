import { useEffect, useState } from "react"
import type { FilterUser } from "../../types/User"
import Spinner from "../../components/Spinner"
import { api } from "../../utils/api"
import toast from "react-hot-toast"
import { getErrorMessage } from "../../utils/error"

const InformationPage = () => {
    const [user, setUser] = useState<FilterUser>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchMe = async () => {
            try {
                setIsLoading(true);
                const res = await api.get("/users/me");
                setUser(res.data.user)
            } catch (error) {
                toast.error(getErrorMessage(error))
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMe()
    }, [])
    return (
        <div>
            {isLoading ?
                <Spinner /> :
                <div>
                    {user?.id}
                </div>
            }
        </div>
    )
}

export default InformationPage
