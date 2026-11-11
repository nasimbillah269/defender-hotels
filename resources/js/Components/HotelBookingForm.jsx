import { FiPhoneCall } from "react-icons/fi";
import { useForm, usePage } from "@inertiajs/react";
import { Form } from "react-bootstrap";
import AlertMessageComponents from "./AlertMassageCompononets";

/**
 * "Free Consultation" block shown at the bottom of every page.
 * Same fields as the Contact Us form; posts to the `contactMail` route.
 */
export default function HotelBookingForm() {
    const { props } = usePage();
    const phone = props.general?.mobile || "+88 01953 000022";

    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("contactMail"), {
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
                <div className="row align-items-start gy-4">
                    <div className="col-lg-6" data-aos="fade">
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

                    <div className="col-lg-5 offset-lg-1" data-aos="fade">
                        <div className="dh-consult__card">
                            <p className="dh-kicker">Register Your Interest</p>
                            <h4>Free Consultation</h4>

                            <AlertMessageComponents status={errors.status} message={errors.messages || (errors.status ? errors.message : null)} />

                            <Form onSubmit={submit} noValidate={false}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        aria-label="Your Name"
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

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Subject"
                                        aria-label="Subject"
                                        required
                                        maxLength={100}
                                        value={data.subject}
                                        onChange={(e) => setData("subject", e.target.value)}
                                    />
                                    {errors.subject && <span className="text-danger">{errors.subject}</span>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Message"
                                        aria-label="Message"
                                        maxLength={500}
                                        value={data.message}
                                        onChange={(e) => setData("message", e.target.value)}
                                    />
                                    {errors.status !== "success" && errors.message && (
                                        <span className="text-danger">{errors.message}</span>
                                    )}
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
