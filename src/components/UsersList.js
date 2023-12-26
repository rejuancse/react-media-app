import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from './Button';
import Skeleton from "./Skeleton";

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingError] = useState(null);

    const dispatch = useDispatch();
    const { data } = useSelector( (state) => {
        return state.users;
    })

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .catch((err) => setLoadingError(err))
            .finally(() => setIsLoadingUsers(false))
    }, [dispatch]);

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700 font-roboto text-white text-sm text-left font-bold leading-6 shadow-lg overflow-hidden">
                <div className="p-4 text-slate-400 bg-white dark:bg-slate-800 border border-x-0 cursor-pointer hover:bg-gray-100">
                    {user.name}
                </div>
            </div>
        )
    });

    if( isLoadingUsers ) {
        return <Skeleton times={6} className="h-10 w-full" />
    }

    if( loadingUsersError ) {
        return <div>Error fetching data...</div>
    }

    const handleUserAdd = () => {
        dispatch(addUser());
    }

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h2 className="m-2 text-xl">Users List</h2>
                <Button onClick={handleUserAdd}>
                    + Add User
                </Button>
            </div>
            {renderedUsers}
        </div>
    )
}

export default UsersList;
