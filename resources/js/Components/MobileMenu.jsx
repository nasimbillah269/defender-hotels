import { Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";

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

  return (
    <>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sd-header d-flex justify-content-between align-items-center">
          <Link href="/" onClick={onClose}>
            <img
              src={`/${general?.logo}`}
              className="logo-img"
              alt={general?.title || "Logo"}
            />
          </Link>

          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {cleanedMenu?.length > 0 && (
          <div className="sd-body">
            <ul>
              {cleanedMenu.map((item, index) => {
                const parentActive =
                  isActive(item.slug) ||
                  (item.items?.some((sub) => isActive(sub.slug)) ?? false);

                const hasChildren = (item.items?.length ?? 0) > 0;

                return (
                  <li key={item?.id ?? item?.slug ?? index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <Link
                        href={normalize(item.slug)}
                        className={`sd-link ${parentActive ? "active" : ""}`}
                        onClick={onClose}
                      >
                        {item.title}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          className="toggle-btn"
                          onClick={() => toggleSubmenu(index)}
                          aria-label="Toggle submenu"
                        >
                          {openSubmenu === index ? <FiMinus /> : <FiPlus />}
                        </button>
                      )}
                    </div>

                    {hasChildren && openSubmenu === index && (
                      <ul className="dropdown-menu">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subItem?.id ?? subItem?.slug ?? subIndex}>
                            <Link
                              href={normalize(subItem.slug)}
                              className={`dropdown-item ${
                                isActive(subItem.slug) ? "active" : ""
                              }`}
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
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />
    </>
  );
};

export default MobileMenu;
