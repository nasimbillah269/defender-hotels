import { FaWhatsapp } from "react-icons/fa";

/**
 * Floating WhatsApp button (bottom-right, above the chat button).
 * Pulse rings + gentle icon wiggle (no hover effect).
 */
const PHONE = "8801953000022"; // international format, digits only (wa.me requirement)
const MESSAGE = "Hello! I would like to know more about Defender Hotels & Resorts.";

const WhatsAppChatButton = () => {
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      className="wa-float"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="wa-float__ring" aria-hidden="true" />
      <span className="wa-float__ring wa-float__ring--late" aria-hidden="true" />
      <span className="wa-float__icon" aria-hidden="true">
        <FaWhatsapp />
      </span>
      <span className="wa-float__dot" aria-hidden="true" />
    </a>
  );
};

export default WhatsAppChatButton;
