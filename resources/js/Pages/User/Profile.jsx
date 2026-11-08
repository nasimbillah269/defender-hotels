import banner from "../../.././../public/images/img/Header Image.jpg";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm} from "@inertiajs/react";
import UserDashboardSideBar from "@/Components/UserDashboardSideBar";
import Form from 'react-bootstrap/Form';
import AlertMessageComponents from "@/Components/AlertMassageCompononets";

export default function Profile({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
    user
}) {

    const { data, setData, post, reset, processing, errors } = useForm({
        name: auth?.user?.name || '',
        mobile: auth?.user?.mobile || '',
        email: auth?.user?.email || '',
        address: auth?.user?.address_line1 || '',
    });
    
    const submit = (e) => {
        e.preventDefault();
    
        post(route('user.profileEdit'), {
            onSuccess: () => {
                reset(); // Reset the form data
            },
            onError: (errors) => {
                console.log(errors);
                // If the error response contains status and message, set them
                if(errors.status=='success'){
                    setData({ image: null }); // Reset the data state
                    document.getElementById('file-input').value = ''; 
                    reset();
                }
            },
            onFinish: () => {
                console.log("Password change process finished.");
            }
        });
    };



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
                            <h1 className="mt-4">My Profile</h1>
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
                                            <h2 className="mb-3">My Profile</h2>
                                            <div className="userProfile contactForm">
                                            <AlertMessageComponents status={errors.status} message={errors.message} />
                                                <Form onSubmit={submit}>
                                                    <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="profileLeftSide">
                                                            <img src={user.image_url} alt={user.name} />
                                                            <br />
                                                            <br />
                                                            <Form.Label>{auth.user.name}</Form.Label>
                                                            <Form.Control type="file" id="file-input"
                                                                onChange={e => setData('image', e.target.files[0])}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="profileRightSide">
                                                            
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Name*</Form.Label>
                                                                        <Form.Control type="text" 
                                                                        placeholder="Enter Your Name"
                                                                        required
                                                                        value={data.name}
                                                                        onChange={e => setData('name', e.target.value)}
                                                                        
                                                                        />
                                                                        <span className='text-danger'> {errors.name && <span>{errors.name}</span>}</span>
                                                                    </Form.Group>
                                                                </div>
                                                               
                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Mobile Number</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter Your Mobile Number"
                                                                            value={data.mobile}
                                                                            onChange={e => setData('mobile', e.target.value)}
                                                                        />
                                                                        <span className='text-danger'> {errors.mobile && <span>{errors.mobile}</span>}</span>
                                                                    </Form.Group>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>Email Address*</Form.Label>
                                                                        <Form.Control type="email" 
                                                                            placeholder="Enter Your Email"
                                                                            required
                                                                            value={data.email}
                                                                            onChange={e => setData('email', e.target.value)}
                                                                        />
                                                                        <span className='text-danger'> {errors.email && <span>{errors.email}</span>}</span>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                           <div className="row">
                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                                                                        <Form.Label> Address</Form.Label>
                                                                        <Form.Control as="textarea" placeholder="Write address" rows={3}
                                                                        
                                                                        value={data.address}
                                                                        onChange={e => setData('address', e.target.value)}
                                                                        />
                                                                        <span className='text-danger'> {errors.address && <span>{errors.address}</span>}</span>
                                                                    </Form.Group>
                                                                </div>
                                                           </div>
                                                            <button type="submit" disabled={processing} className="btn btn-primary">Profile Update</button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </Form>
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
