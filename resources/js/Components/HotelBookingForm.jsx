import { FiPhoneCall } from "react-icons/fi";
import { useForm, usePage } from "@inertiajs/react";
import { Form } from "react-bootstrap";
import AlertMessageComponents from "./AlertMassageCompononets";

/**
 * "Free Consultation" block shown at the bottom of every page.
 * Posts to the existing `booking` route (booking_type = 1).
 */
export default function HotelBookingForm({ servicesList }) {
    const { props } = usePage();
    const ownershipList = servicesList ?? props.servicesList ?? [];
    const phone = props.general?.mobile || "+88 01953 000022";

    const { data, setData, post, reset, processing, errors } = useForm({
        booking_type: 1,
        name: "",
        email: "",
        mobile: "",
        category: "",
        quantity: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("booking"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (err) => {
                if (err.status === "success") reset();
            },
        });
    };

    return (
        <section className="dh-consult" id="consultation">
            <div className="container">
                <div className="row align-items-end gy-4">
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="dh-consult__info">
                            <h3>Invest in Your Future with Defender Projects!</h3>
                            <p>
                                Take the first step towards owning a luxury hotel suite. Register your
                                interest today and explore exclusive investment opportunities with Defender.
                            </p>
                            <p>
                                <strong>Register Now &amp; Secure Your Investment Opportunity.</strong>
                            </p>
                            <a className="dh-call mt-2" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                                <span className="dh-call__icon"><FiPhoneCall /></span>
                                <span>
                                    <span className="dh-call__label">Call Anytime</span>
                                    <span className="dh-call__num">{phone}</span>
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-5 offset-lg-1" data-aos="fade-up">
                        <div className="dh-consult__card">
                            <p className="dh-kicker">Register Your Interest</p>
                            <h4>Free Consultation</h4>

                            <AlertMessageComponents status={errors.status} message={errors.message} />

                            <Form onSubmit={submit} noValidate={false}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Applicant Name"
                                        aria-label="Applicant Name"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-label="Email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </Form.Group>

                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <Form.Control
                                            type="tel"
                                            inputMode="tel"
                                            placeholder="Phone No."
                                            aria-label="Phone Number"
                                            required
                                            value={data.mobile}
                                            onChange={(e) => setData("mobile", e.target.value)}
                                        />
                                        {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
                                    </div>
                                    <div className="col-6">
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            placeholder="Ownership Qty"
                                            aria-label="Ownership Quantity"
                                            value={data.quantity}
                                            onChange={(e) => setData("quantity", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Select
                                        required
                                        aria-label="Ownership Category"
                                        value={data.category}
                                        onChange={(e) => setData("category", e.target.value)}
                                    >
                                        <option value="">Select Ownership</option>
                                        {ownershipList.map((ctg) => (
                                            <option key={ctg.id} value={ctg.id}>
                                                {ctg.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.category && <span className="text-danger">{errors.category}</span>}
                                </Form.Group>

                                <button type="submit" className="dh-submit" disabled={processing}>
                                    {processing ? "Submitting..." : "Request a Consultation"}
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
