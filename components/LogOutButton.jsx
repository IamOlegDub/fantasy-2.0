import { useRouter } from 'next/navigation';
import Button from './Button';
import useUserStore from '@/store/userStore';

const LogOutButton = ({ onCloseMenu }) => {
    const router = useRouter();
    const removeUser = useUserStore((state) => state.removeUser);

    const handleLogOut = () => {
        removeUser();
        router.replace('/login');
        onCloseMenu(false);
    };

    return (
        <Button
            bgColor='bg-pink-600'
            activeBgColor='bg-pink-700'
            handleClick={handleLogOut}
        >
            Log out
        </Button>
    );
};

export default LogOutButton;
