import { useEffect, useState } from "react";
import type { FilterUser } from "../../types/User";
import { api } from "../../utils/api";
import { getErrorMessage } from "../../utils/error";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

function ListUsers() {
    const [users, setUsers] = useState<FilterUser[]>();
    const [userCount, setUserCount] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const handler = async () => {
            try {
                setLoading(true);
                const { status, users, results } = await api.get('/users/users');
                setUsers(users);
                setUserCount(results);
                toast.success(status);
            } catch (error) {
                console.error(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        handler();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">List Users</h1>
            <p className="text-sm text-gray-600 mb-6">
                Total Users: <span className="font-semibold">{userCount}</span>
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-blue-100 rounded-xl shadow-md p-4 hover:bg-blue-200 transition"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                            <p className="text-sm text-gray-700">Role: {user.role}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
}

export default ListUsers;


