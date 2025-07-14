import { LoginForm } from "../forms/LoginForm"

// interface Props {
//     onSubmit: (data: {
//         email: string;
//         password: string;
//     }) => void;
//     err: string;
// }
const LoginPage = () => {
    return (
        <div className=" flex items-center justify-center min-h-screen">
            <LoginForm />
        </div>
    )
}

export default LoginPage
