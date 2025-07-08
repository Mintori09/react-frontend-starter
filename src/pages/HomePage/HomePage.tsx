import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store";

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.appState);
    console.log(appState)

    return (
        <div>From Home Page</div>
    )
}

export default HomePage
