import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

type Props = {
    state?: string;
    children: ReactNode;
};

const PageWrapper = ({ state, children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (state) {
            dispatch(setAppState(state));
        }
    }, [dispatch, state]); // ✅ chỉ cần phụ thuộc vào `state`, không cần `props`

    return <>{children}</>;
};

export default PageWrapper;
