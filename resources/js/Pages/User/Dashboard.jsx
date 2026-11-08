import banner from "../../.././../public/images/img/Header Image.jpg";
import UserDashboardSideBar from "@/Components/UserDashboardSideBar";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";


export default function Dashbaord({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
}) {
    return (
        <>
            <MainLayout
                auth={auth}
                general={general}
                headerMenu={headerMenu}
                footerMenu2={footerMenu2}
                footerMenu3={footerMenu3}
            >
                <Head title='Dashbaord' />
                <div className="pageBanner">
                    <div
                        className="bgImg"
                        style={{
                            backgroundImage: `url(${banner})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            padding: "100px 0px",
                        }}
                    >
                        <div className="container">
                            <h1 className="mt-4">Dashboard</h1>
                        </div>
                    </div>
                </div>
                <div
                    className="pageContect"
                    style={{ minHeight: "300px" }}
                >

                        <div className="userDashBoardMainLayout">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3">
                                        <UserDashboardSideBar auth={auth}/>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="dashboardRightSide">
                                            <div className="dashboardInfo">
                                                <h4>Welcome to {auth.user.name}</h4>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </MainLayout>
        </>
    );
}
