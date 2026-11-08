import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { BiDonateHeart } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";


export default function UserDashboardSideBar({auth}) {
    const { url } = usePage();
    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout')); 
    };

  return (
    <>
            <div className="dashboardSidebar">
                                            
                <ul>
                    {auth?.user?.admin && ( 
                        <li>
                            <a href={route('admin.dashboard')}>
                            <RxDashboard />
                                Admin Dashboard
                            </a>
                        </li>
                    )}
                   
                    <li>
                        <Link className={url.startsWith('/user/dashboard') ? 'active' : ''} href={route('user.dashboard')}>
                        <RxDashboard />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link className={url.startsWith('/user/profile') ? 'active' : ''} href={route('user.profileEdit')}>
                        <CgProfile />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className={url.startsWith('/user/mybooking') ? 'active' : ''} href={route('user.myBooking')}>
                        <BiDonateHeart />
                            My Booking
                        </Link>
                    </li>
                    <li>
                        <Link className={url.startsWith('/user/changepassword') ? 'active' : ''} href={route('user.changePassword')}>
                        <RiLockPasswordFill />
                            Change Password
                        </Link>
                    </li>
                    <li>
                        <Link href="#" onClick={handleLogout}>
                        <MdLogout />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
    </>
  )
}
