import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
// import banner from "../../../public/images/img/Header Image.jpg";
import banner from "../../../public/images/new/header/header.png";

export default function PageView({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    footerMenu4,
    page,
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
                footerMenu4={footerMenu4}
            >
                <Head title={page.name} />
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
                            <h1 className="mt-4">{page.name}</h1>
                        </div>
                    </div>
                </div>
                <div
                    className="pageContect"
                    style={{ minHeight: "300px" }}
                >
                    <div className="container">
                     <div className="dh-richtext" style={{ padding: "50px 0"}} dangerouslySetInnerHTML={{ __html: page.description }} />  
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
