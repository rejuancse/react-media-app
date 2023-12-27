import { IoTrashOutline } from 'react-icons/io5';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

function UserListItem({user}) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user)
    }

    return (
        <div className="mb-2 border rounded">
            <div className="flex flex-row p-2 items-center cursor-pointer">
                <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                    <IoTrashOutline />
                </Button>
                { error && <div>Error deleting user.</div> }
                {user.name}
            </div>
        </div>
    );
}

export default UserListItem;
