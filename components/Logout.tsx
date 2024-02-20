import Link from "next/link";
import { MdLogout } from "react-icons/md";

export default function Logout() {
    return (
        // <div className="w-1/3">
            <Link
                className='flex gap-1 items-center hover:text-blue-600'
                href='/api/auth/logout'
            >
                <MdLogout />
                Logout
            </Link>
        // </div>
    );
}
