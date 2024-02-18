import Link from "next/link";
import { MdLogout } from "react-icons/md";

export default function Logout() {
    return (
        <div className="w-1/3">
            <Link
                className='flex gap-1 mt-3 mr-3 items-center justify-end text-blue-500 hover:text-blue-600'
                href='/api/auth/logout'
            >
                <MdLogout />
                Logout
            </Link>
        </div>
    );
}
