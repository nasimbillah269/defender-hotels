import MainLayout from "@/Layouts/MainLayout";
import { Head} from "@inertiajs/react";
import UserDashboardSideBar from "@/Components/UserDashboardSideBar";
import { Table } from "react-bootstrap";

export default function MyDonation({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
    donation
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
                    <div className="container">
                        <p>Dashboard</p>
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
                                            <h2 className="mb-3">Donation Money Receipt</h2>
                                            <div className="donationView">
                                                <Table responsive className="table-bordered">
                                                    <tr>
                                                        <th style={{width: "150px"}}>Date</th>
                                                        <th style={{width: "20px"}}>:</th>
                                                        <td>{donation.createdAt}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>:</th>
                                                        <td>{donation.billing_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email/Phone</th>
                                                        <th>:</th>
                                                        <td>{donation.billing_email} {donation.billing_mobile}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <th>:</th>
                                                        <td>
                                                        {donation.formatAmount}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Method</th>
                                                        <th>:</th>
                                                        <td>
                                                        {donation.payment_method}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Donate For</th>
                                                        <th>:</th>
                                                        <td>
                                                        {donation.type == 1 && (
                                                            <div>
                                                                {donation.srcData_slug ? (
                                                                    <Link href={route("serviceView", donation.srcData_slug)} style={{textDecoration: "none"}}>
                                                                        {donation.srcData_title}
                                                                    </Link>
                                                                ) : (
                                                                    <span>Not found</span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {donation.type == 0 && (
                                                            <div>
                                                            {donation.srcData_slug ? (
                                                                <Link href={route("serviceCategory", donation.srcData_slug)} style={{textDecoration: "none"}}>
                                                                    {donation.srcData_title}
                                                                </Link>
                                                            ) : (
                                                                <span>Not found</span>
                                                            )}
                                                            </div>
                                                        )}
                                                        </td>
                                                    </tr>
                                                </Table>
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
