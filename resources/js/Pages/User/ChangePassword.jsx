import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage} from "@inertiajs/react";
import UserDashboardSideBar from "@/Components/UserDashboardSideBar";
import { Form, InputGroup } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import AlertMessageComponents from "@/Components/AlertMassageCompononets";


export default function changePassword({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
}) 

{

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
};

const { data, setData, post, reset, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const submit = (e) => {
    e.preventDefault();

    post(route('user.changePassword'), {
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
                    <div className="container">
                        <p>Change Password</p>
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
                                            <h2 className="mb-3">Change Password</h2>
                                            <div className="changePassword contactForm">
                                            <AlertMessageComponents status={errors.status} message={errors.message} />

                                                <Form onSubmit={submit}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                        <Form.Group  controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Current Password*</Form.Label>
                                                        <InputGroup >
                                                        <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Current password"
                                                            value={data.current_password}
                                                            onChange={e => setData('current_password', e.target.value)}
                                                        />
                                                            <InputGroup.Text style={{cursor: "pointer",height:"42px"}} onClick={togglePasswordVisibility} >{showPassword ?  <IoEyeSharp/> :  <FaEyeSlash/>}</InputGroup.Text>
                                                        </InputGroup>
                                                        <span className='text-danger'> {errors.current_password && <span>{errors.current_password}</span>}</span>
                                                        </Form.Group>
                                                        </div>
                                                        
                                                        <div className="col-md-12">
                                                            <Form.Group  controlId="exampleForm.ControlInput1">
                                                                <Form.Label>New Password*</Form.Label>
                                                                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="new password"
                                                                    value={data.password}
                                                                    onChange={e => setData('password', e.target.value)}
                                                                
                                                                />
                                                                <span className='text-danger'> {errors.password && <span>{errors.password}</span>}</span>
                                                            </Form.Group>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Confirm Password*</Form.Label>
                                                                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="confirm password"
                                                                     value={data.password_confirmation}
                                                                     onChange={e => setData('password_confirmation', e.target.value)}
                                                                />
                                                                <span className='text-danger'> {errors.password_confirmation && <span>{errors.password_confirmation}</span>}</span>
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                    <button type="submit" disabled={processing} className="btn btn-primary">Change Password</button>
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
