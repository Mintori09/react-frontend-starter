import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store";
import { api } from "../../utils/api";

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.appState);
    console.log(appState)
    const get_me = async () => {
        const response = await api.get("/users/me");
        console.log(response);
    }
    get_me();
    return (
        <div>From Home Page</div>
    )
}

export default HomePage
