import { BrowserRouter, Routes } from 'react-router-dom'
import { routes } from './routes'
import { useEffect, useState } from 'react';
import { api } from './utils/api';
import { useAuth } from './hooks/useAuth';
import Spinner from './components/Spinner';

function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const { login } = useAuth()

    useEffect(() => {
        const init = async () => {
            try {
                const res = await api.get("/users/me");
                login(res.data.user);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        init()
    }, [login])

    return (
        loading ? <Spinner /> :
            <BrowserRouter>
                <Routes>
                    {routes}
                </Routes>
            </BrowserRouter>
    )
}

export default App
