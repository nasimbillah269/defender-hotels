import MainLayout from "@/Layouts/MainLayout";
import { Head, Link} from "@inertiajs/react";
import UserDashboardSideBar from "@/Components/UserDashboardSideBar";
import banner from "../../.././../public/images/img/Header Image.jpg";
import { Table } from "react-bootstrap";
import Pagination from "@/Components/Pagination";

export default function MyDonation({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
    bookings
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
                            <h1 className="mt-4">My Booking</h1>
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
                                            <h2 className="mb-3">My Donations</h2>
                                            <div className="donationView">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                <th style={{minWidth: "50px",width: "50px"}}>SL.</th>
                                                                <th style={{minWidth: "250px"}}>Beneficiary Name</th>
                                                                <th style={{minWidth: "120px",width: "120px"}}>Amount</th>
                                                                <th style={{minWidth: "130px",width: "130px"}}>Method</th>
                                                                <th style={{minWidth: "100px",width: "100px"}}>Status</th>
                                                                <th style={{minWidth: "170px",width: "170px"}}>Date</th>
                                                                
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {bookings.data.map((booking,index) =>(
                                                                    <tr>
                                                                        <td>{index+1}</td>
                                                                        <td>
                                                                        
                                                                        </td>
                                                                        <td>{booking.formatAmount}</td>
                                                                        <td>{booking.payment_method}</td>
                                                                        <td>{booking.status}</td>
                                                                        <td>{booking.createdAt}</td>
                                                                    </tr>
                                                                ))
                                                                }
                                                                {bookings.data.length==0 && (
                                                                    <tr>
                                                                        <td colSpan={5} style={{textAlign:"center"}}>No Donation</td>
                                                                    </tr>

                                                                )}
                                                                
                                                            </tbody>
                                                        </Table>
                                                        
                                                        <Pagination pagination ={bookings} />

                                                    </div>
                                                </div>
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
