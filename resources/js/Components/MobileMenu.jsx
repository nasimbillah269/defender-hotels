import { Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { FiX, FiChevronDown, FiPhoneCall } from "react-icons/fi";

const MobileMenu = ({ general, headerMenu, isOpen, onClose, activePath }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  useEffect(() => {
    if (!isOpen) setOpenSubmenu(null);
  }, [isOpen]);

  /* -------- helpers -------- */
  const normalize = (path) => {
    if (!path) return "/";
    const p = String(path).split("?")[0].split("#")[0].trim();
    if (p === "") return "/";
    return p.startsWith("/") ? p : `/${p}`;
  };

  const isActive = (slug) => {
    // "#" style placeholder links (e.g. dropdown parents) are never active by themselves
    if (typeof slug === "string" && slug.trim().startsWith("#")) return false;
    const current = normalize(activePath);
    const target = normalize(slug);
    return (
      current === target ||
      (target !== "/" && current.startsWith(`${target}/`))
    );
  };

  // ✅ Remove blank / invalid menu items but keep dropdown structure
  const cleanedMenu = useMemo(() => {
    const items = headerMenu?.items ?? [];

    const isValidItem = (it) => {
      const title = (it?.title ?? "").trim();
      const slug = (it?.slug ?? "").trim();

      // remove entries that render as blank buttons/links
      if (!title && !slug) return false;

      // optional: if slug is "#" or "javascript:void(0)" but has no children, remove
      const badSlug =
        slug === "#" ||
        slug.toLowerCase() === "javascript:void(0)" ||
        slug.toLowerCase() === "javascript:void(0);";

      if (badSlug && !(it?.items?.length > 0)) return false;

      // if no title, also remove (prevents blank label)
      if (!title) return false;

      return true;
    };

    return items
      .filter(isValidItem)
      .map((item) => {
        const subItems = (item?.items ?? []).filter((sub) => {
          const t = (sub?.title ?? "").trim();
          const s = (sub?.slug ?? "").trim();
          return !!t && !!s; // submenu must have both
        });

        return { ...item, items: subItems };
      })
      .filter((item) => {
        // if parent has slug "#" but now has no submenu, remove it
        const slug = (item?.slug ?? "").trim();
        const badSlug =
          slug === "#" ||
          slug.toLowerCase() === "javascript:void(0)" ||
          slug.toLowerCase() === "javascript:void(0);";
        if (badSlug && !(item?.items?.length > 0)) return false;
        return true;
      });
  }, [headerMenu]);

  // Close with the Escape key
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const phone = general?.mobile || "+88 01953 000022";
  const isPlaceholder = (slug) => String(slug ?? "").trim().startsWith("#");

  return (
    <>
      <aside
        className={`dh-mnav ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        <div className="dh-mnav__head">
          <Link href="/" onClick={onClose} className="dh-mnav__logo">
            <img src={`/${general?.logo}`} alt={general?.title || "Logo"} />
          </Link>
          <button type="button" className="dh-mnav__close" onClick={onClose} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav className="dh-mnav__body">
          <ul className="dh-mnav__list">
            {cleanedMenu.map((item, index) => {
              const hasChildren = (item.items?.length ?? 0) > 0;
              const parentActive =
                isActive(item.slug) ||
                (item.items?.some((sub) => isActive(sub.slug)) ?? false);
              const open = openSubmenu === index;

              return (
                <li key={item?.id ?? item?.slug ?? index} className={`dh-mnav__item ${open ? "is-open" : ""}`}>
                  <div className="dh-mnav__row">
                    {hasChildren && isPlaceholder(item.slug) ? (
                      <button
                        type="button"
                        className={`dh-mnav__link ${parentActive ? "is-active" : ""}`}
                        onClick={() => toggleSubmenu(index)}
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link
                        href={normalize(item.slug)}
                        className={`dh-mnav__link ${parentActive ? "is-active" : ""}`}
                        onClick={onClose}
                      >
                        {item.title}
                      </Link>
                    )}

                    {hasChildren && (
                      <button
                        type="button"
                        className="dh-mnav__toggle"
                        onClick={() => toggleSubmenu(index)}
                        aria-label={`${open ? "Collapse" : "Expand"} ${item.title}`}
                        aria-expanded={open}
                      >
                        <FiChevronDown />
                      </button>
                    )}
                  </div>

                  {hasChildren && open && (
                    <ul className="dh-mnav__sub">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subItem?.id ?? subItem?.slug ?? subIndex}>
                          <Link
                            href={normalize(subItem.slug)}
                            className={`dh-mnav__sublink ${isActive(subItem.slug) ? "is-active" : ""}`}
                            onClick={onClose}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="dh-mnav__foot">
          <Link href="/invest-now" className="dh-mnav__cta" onClick={onClose}>
            Book a Consultation
          </Link>
          <a className="dh-mnav__phone" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
            <FiPhoneCall /> {phone}
          </a>
        </div>
      </aside>

      {/* Overlay */}
      <div className={`dh-mnav-overlay ${isOpen ? "is-open" : ""}`} onClick={onClose} />
    </>
  );
};

export default MobileMenu;
