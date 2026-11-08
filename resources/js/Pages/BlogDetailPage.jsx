import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
// import banner from "../../../public/images/img/Header Image.jpg";
import banner from "../../../public/images/new/header/header.png";
import { HiOutlineSearch } from "react-icons/hi";
import { Form } from "react-bootstrap";
import Comments from "@/Components/Comments";
export default function BlogDetailPage({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    footerMenu4,
    blog,
    comments,
    recentPosts,
    auth
}) {


    const { data, setData, get, reset, processing, errors } = useForm({
        search: '',
    });
    
    const searchSubmit = (e) => {
        e.preventDefault();
    
        get(route('blogSearch'), {
            onSuccess: (response) => {
                reset(); // Reset the form data
            },
            onError: (errors) => {
                console.log(errors);
                // If the error response contains status and message, set them
                if(errors.status=='success'){
                    reset();
                }
            },
            onFinish: () => {
                console.log("change process finished.");
            }
        });
    };

  return (
    <>
        <MainLayout auth={auth} general={general}  headerMenu={headerMenu} footerMenu2={footerMenu2} footerMenu3={footerMenu3} footerMenu4={footerMenu4}>
                <Head title="Single Blog " />
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
                            <h1 className="mt-4">Single Blog</h1>
                        </div>
                    </div>
                </div>
                <section className="section-padding singleBLogSection">

                    <div className="container">
                        <div className="singleBlogHead" data-aos="fade-up">
                            <span>Blog Post</span>
                            <h2>{blog.name}</h2>

                            <p className="postDate">{blog.formatData}</p>
                        </div>
                        <div className="row">
                            <div className="col-md-8" data-aos="fade-right">
                                <img src={blog.image_url} className="mb-30" alt={blog.name} />
                            </div>
                          
                            <div className="col-md-4" data-aos="fade-left">
                                <div className="news2-sidebar row">
                                    <div className="col-md-12">
                                        <div className="widget search">
                                            <Form onSubmit={searchSubmit}>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Search Blog"
                                                        value={data.search}
                                                        onChange={e => setData('search', e.target.value)}
                                                    />
                                                    <button type="submit">
                                                        <HiOutlineSearch />
                                                    </button>
                                            </Form>
                                        </div>
                                    </div>
                                    <div className="col-md-12" >
                                        <div className="widget">
                                            <div className="widget-title">
                                                <h6>Recent Posts</h6>
                                            </div>
                                            <ul className="recent" >
                                                {recentPosts.map((rblog)=>
                                                <li >
                                                    <div className="thum"><img src={rblog.image_url} alt={rblog.name} /></div>
                                                    <Link href={route('blogView',rblog.slug)}>
                                                        {rblog.name}
                                                    </Link>
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="postDes">
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />  
                                </div>
                            </div>
                        </div>
                        <div className="post-comment-section">
                            <Comments blog={blog} comments={comments} ></Comments>
                        </div>
                    </div>
                </section>

            </MainLayout>
    </>
  )
}
