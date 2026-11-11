import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";
import { Form } from "react-bootstrap";
import AlertMessageComponents from "@/Components/AlertMassageCompononets";
import HotelBookingForm from "@/Components/HotelBookingForm";
import { useEffect, useMemo, useState } from "react";

export default function BookingPage({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  auth,
  servicesList = [],
}) {
  const [amountMessage, setAmountMessage] = useState("");

  const quantityOptions = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }, []);

  const { data, setData, post, reset, processing, errors } = useForm({
    booking_type: 0,
    name: "",
    booking_date: new Date().toISOString().split("T")[0],
    address: "", // ✅ FIXED: you were using data.address but missing this in initial state
    email: "",
    mobile: "",
    category: "",
    nid_number: "",
    quantity: 1,
    amount: 0,
    booking_amount: "",
    payment_method: "",
    attachment: null,
    bank_details: "",
  });

  // Helper: compute amount
  const computeAmount = (categoryId, quantity) => {
    const selected = servicesList.find((ctg) => ctg.id === Number(categoryId));
    const sharePrice = selected?.share_price ? Number(selected.share_price) : 0;
    const qty = Number(quantity) || 0;
    return sharePrice * qty;
  };

  // Pre-fill from query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const category = params.get("category");

    const amount = category ? computeAmount(category, data.quantity) : 0;

    setData((prev) => ({
      ...prev,
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(category ? { category } : {}),
      ...(category ? { amount } : {}),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const newAmount = computeAmount(categoryId, data.quantity);

    setData((prev) => ({
      ...prev,
      category: categoryId,
      amount: newAmount,
    }));

    setAmountMessage("");
  };

  const handleQuantityChange = (e) => {
    const qty = Number(e.target.value) || 1;
    const newAmount = computeAmount(data.category, qty);

    setData((prev) => ({
      ...prev,
      quantity: qty,
      amount: newAmount,
    }));

    // If booking_amount already typed, re-check validity
    if (data.booking_amount && Number(data.booking_amount) > newAmount) {
      setAmountMessage("Booking amount cannot exceed the ownership price.");
    } else {
      setAmountMessage("");
    }
  };

  const handleBookingAmountChange = (e) => {
    const value = e.target.value;

    // Allow empty typing
    if (value === "") {
      setData("booking_amount", "");
      setAmountMessage("");
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num) || num < 0) {
      setAmountMessage("Please enter a valid amount.");
      return;
    }

    if (num > Number(data.amount || 0)) {
      setAmountMessage("Booking amount cannot exceed the ownership price.");
      // keep value but show message OR block it; here we keep and warn
      setData("booking_amount", value);
      return;
    }

    setAmountMessage("");
    setData("booking_amount", value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("booking"), {
      onSuccess: () => {
        reset();
        setAmountMessage("");
        const fileInput = document.getElementById("inputGroupFile02");
        if (fileInput) fileInput.value = "";
      },
      onError: () => {
        // keep errors shown by component
      },
    });
  };

  const selectedFileName = data.attachment?.name;

  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title="Invest Now" />

      {/* Banner (unchanged) */}
      <div className="pageBanner">
        <div
          className="bgImg"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            padding: "110px 0px",
          }}
        >
          <div className="container">
            <h1 className="mt-4">Invest Now</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue dh-invest">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="dh-head mb-4" data-aos="fade">
                <p className="dh-kicker">Investment Form</p>
                <h2 className="dh-title">
                  Take the First Step <br /> Towards Ownership.
                </h2>
                <p className="dh-text">
                  Explore exclusive hospitality investment opportunities with Defender Hotels &amp; Resorts.
                  Submit your details to receive expert guidance and learn more about ownership options,
                  investment benefits, and available projects.
                </p>
              </div>

              <AlertMessageComponents status={errors.status} message={errors.message} />

              <Form onSubmit={submit} data-aos="fade">
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="Applicant Name"
                      aria-label="Applicant Name"
                      required
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      type="date"
                      aria-label="Application Date"
                      title="Application Date"
                      required
                      value={data.booking_date}
                      onChange={(e) => setData("booking_date", e.target.value)}
                    />
                    {errors.booking_date && <span className="text-danger">{errors.booking_date}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      aria-label="Address"
                      required
                      value={data.address}
                      onChange={(e) => setData("address", e.target.value)}
                    />
                    {errors.address && <span className="text-danger">{errors.address}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                      required
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                  </div>

                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="NID Card No."
                      aria-label="NID Card Number"
                      required
                      value={data.nid_number}
                      onChange={(e) => setData("nid_number", e.target.value)}
                    />
                    {errors.nid_number && <span className="text-danger">{errors.nid_number}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Select
                      required
                      aria-label="Category of Ownership"
                      value={data.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Category of Ownership</option>
                      {servicesList.map((ctg) => (
                        <option key={ctg.id} value={ctg.id}>
                          {ctg.short_description ||
                            `${ctg.name}${ctg.share_price ? ` — BDT ${Number(ctg.share_price).toLocaleString()}` : ""}`}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.category && <span className="text-danger">{errors.category}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Select
                      required
                      aria-label="Number of Ownership"
                      value={data.quantity}
                      onChange={handleQuantityChange}
                    >
                      {quantityOptions.map((q) => (
                        <option key={q} value={q}>
                          {q} Ownership
                        </option>
                      ))}
                    </Form.Select>
                    {errors.quantity && <span className="text-danger">{errors.quantity}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      readOnly
                      aria-label="Ownership Price"
                      placeholder="Ownership Price (Shown when select number)"
                      value={data.amount ? `Ownership Price: ${Number(data.amount).toLocaleString()}` : ""}
                    />
                    {errors.amount && <span className="text-danger">{errors.amount}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Investment Amount"
                      aria-label="Investment Amount"
                      required
                      value={data.booking_amount}
                      onChange={handleBookingAmountChange}
                    />
                    {amountMessage && <span className="text-danger">{amountMessage}</span>}
                    {errors.booking_amount && <span className="text-danger">{errors.booking_amount}</span>}
                  </div>

                  <div className="col-md-6">
                    <Form.Select
                      required
                      aria-label="Payment Type"
                      value={data.payment_method}
                      onChange={(e) => setData("payment_method", e.target.value)}
                    >
                      <option value="">Payment Type (Cash/Cheque/Bank Transfer)</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Mobile Banking">Mobile Banking</option>
                    </Form.Select>
                    {errors.payment_method && <span className="text-danger">{errors.payment_method}</span>}
                  </div>

                  <div className="col-md-6">
                    <div className="dh-file">
                      <span className="dh-file__name">{selectedFileName || "Receipt/Screenshot"}</span>
                      <label className="dh-file__btn" htmlFor="inputGroupFile02">
                        Upload
                      </label>
                      <input
                        type="file"
                        id="inputGroupFile02"
                        accept="image/*"
                        hidden
                        onChange={(e) => setData("attachment", e.target.files?.[0] || null)}
                      />
                    </div>
                    {errors.attachment && <span className="text-danger">{errors.attachment}</span>}
                  </div>

                  <div className="col-12">
                    <Form.Control
                      type="text"
                      placeholder="Applicant Bank Details"
                      aria-label="Applicant Bank Details"
                      required
                      value={data.bank_details}
                      onChange={(e) => setData("bank_details", e.target.value)}
                    />
                    {errors.bank_details && <span className="text-danger">{errors.bank_details}</span>}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="dh-btn dh-btn--lg" disabled={processing || !!amountMessage}>
                    {processing ? "SUBMITTING..." : "INVEST NOW"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <HotelBookingForm servicesList={servicesList} />
    </MainLayout>
  );
}
