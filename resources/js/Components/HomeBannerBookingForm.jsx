import { useForm } from "@inertiajs/react";
import { Form } from "react-bootstrap";

export default function HomeBannerBookingForm({bookingUrl,servicesList}) {

    const { data, setData, get, reset, processing, errors } = useForm({
        name:'',
        category: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
    
        get(bookingUrl, {
            onSuccess: () => {
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
                console.log("process finished.");
            }
        });
    };


    return (
        <>
            {bookingUrl && (
            <div className="booking-wrapper" >
                <div className="container">
                    <div className="booking-inner clearfix banner">
                        {/* heading shown on tablet/mobile only (form sits below the slider there) */}
                        <div className="booking-mobile-head d-lg-none">
                            <p className="dh-kicker">Start Your Investment</p>
                            <h3>Own a Share of Premium Hospitality</h3>
                        </div>
                        <form onSubmit={submit}>
                            <div className="row g-2">
                                <div className="col-12 col-md-5">
                                     <Form.Group className="input1_inner mb-3">
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Applicant Name"
                                        required
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        />
                                        {errors.name && <span className='text-danger' >{errors.name}</span>}
                                    </Form.Group>

                                </div>
                                <div
                                    className="col-12 col-md-3"
                                        style={{
                                            paddingLeft: "0px",
                                            paddingRight: "0px",
                                        }}
                                    >
                                        <Form.Group className="mb-3">
                                                <Form.Select
                                                required
                                                onChange={e => setData('category', e.target.value)}
                                                >
                                                    <option value="">
                                                    Select Ownership</option>
                                                    {servicesList.map(service => (
                                                        <option key={service.id} value={service.id}>
                                                            {service.name}
                                                        </option>
                                                    ))}

                                                </Form.Select>
                                                    {errors.category && <span className='text-danger' >{errors.category}</span>}
                                        </Form.Group>
                                </div>
                                <div
                                    className="col-12 col-md-4"
                                    style={{ paddingLeft: "0px" }}
                                >
                                    <button type="submit">Invest Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}
