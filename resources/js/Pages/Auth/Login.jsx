import AlertMessageComponents from "@/Components/AlertMassageCompononets";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { LuLogIn } from 'react-icons/lu';

export default function Login({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    auth,
}) {


    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember_me: false,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('hellow');
    
    const submit = (e) => {
        e.preventDefault();
    
        post(route('login'), {
            onSuccess: () => {
                // Handle successful login response here
                console.log("Logged in successfully!");
            },
            onError: (errors) => {
                // Handle error responses here
                 setShowAlert(true);
                setAlertMessage('sdflksd');
                console.log(errors);

            },
            onFinish: () => {
                // Optionally, you can reset form data here
                //reset();
            }
        });
    };



    return (
        <MainLayout
            auth={auth}
            general={general}
            headerMenu={headerMenu}
            footerMenu2={footerMenu2}
            footerMenu3={footerMenu3}
        >
            <Head title="Login" />
            <div className="" style={{ minHeight: "400px" }}>
                
                <div className="container contactForm">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <br />
                            <br />
                        <h2>Login Join us</h2><br />
                        <AlertMessageComponents status={errors.status} message={errors.message} />
                        <Form onSubmit={submit} >
                            <Form.Group controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email Address" value={data.email}
                                    onChange={e => setData('email', e.target.value)} />
                                <span className='text-danger'>{errors.email && <span>{errors.email}</span>}</span>
                            </Form.Group>
                            <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={data.password}
                                    onChange={e => setData('password', e.target.value)} />
                            <span className='text-danger'> {errors.password && <span>{errors.password}</span>}</span>
                            </Form.Group>
                            <div className='row'>
                            <div className='col-md-12'>
                            <Button type="submit" className="w-100" size="lg" disabled={processing}>
                                <LuLogIn style={{ height: "20px", marginRight: "10px" }} /> Login
                            </Button>

                            </div>

                            </div>
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
