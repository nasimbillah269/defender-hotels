import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
// import banner from "../../../public/images/img/Header Image.jpg";
import banner from "../../../public/images/new/header/header.png";
import BlogGrid from "@/Components/BlogGrid";
import { useEffect, useState } from "react";
export default function NewsAndEvents({general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    footerMenu4,
    posts,
    auth
}) {

    const [search,setSearch]= useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchData = params.get('search');
        setSearch(searchData)
    
    }, []);




    return (
        <>
            <MainLayout auth={auth} general={general}  headerMenu={headerMenu} footerMenu2={footerMenu2} footerMenu3={footerMenu3} footerMenu4={footerMenu4}>
                <Head title="Search Blog" />
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
                            <h1 className="mt-4">Search Blog</h1>
                        </div>
                    </div>
                </div>
                <section className="news newsAndEvent">
                    <div className="container">
                        <div className="newAndEventHead">
                            <p>Blog Search</p>
                            <h2>Search: {search} </h2>
                        </div>
                        

                        {posts.data.length > 0 ? (
                            <div className="row">
                                {posts.data.map((post)=>
                                    <div className="col-md-4 mb-30">
                                        <BlogGrid post={post} />
                                    </div>
                                )}
                            </div>
                        ):(
                            <div>
                                <h3>Not Found</h3>
                            </div>
                        )}
                        
                        
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
