import { Link, usePage } from "@inertiajs/react";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";


const Header = ({ auth, general, headerMenu }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { url } = usePage(); // current path from Inertia

  /* -------------------------
     Helpers
  ------------------------- */
  const normalize = (path) => {
    if (!path) return "/";
    const p = path.split("?")[0].split("#")[0];
    if (p === "") return "/";
    return p.startsWith("/") ? p : `/${p}`;
  };

  const currentPath = normalize(url);

  const isActive = (slug) => {
    // "#" style placeholder links (e.g. dropdown parents) are never active by themselves
    if (typeof slug === "string" && slug.trim().startsWith("#")) return false;
    const target = normalize(slug);
    return (
      currentPath === target ||
      (target !== "/" && currentPath.startsWith(`${target}/`))
    );
  };

  /* -------------------------
     Effects
  ------------------------- */
  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  /* -------------------------
     Render
  ------------------------- */
  return (
    <>
      <header className={isSticky ? "sticky" : ""}>
        <nav className="navbar navbar-expand-lg">
          <div className="container header-container">
            {/* Logo */}
            <div className="logo-wrapper">
              <Link className="logo" href="/">
                <img
                  src={`/${general?.logo}`}
                  className="logo-img"
                  alt={general?.title || "Defender Hotels & Resorts"}
                />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="navbar-toggler-icon d-flex align-items-center justify-content-center">
                <FiMenu size={26} />
            </span>

            </button>

            {/* Desktop Menu */}
            <div className="collapse navbar-collapse" id="navbar">
              {headerMenu?.items && (
                <>
                  <ul className="navbar-nav ms-auto">
                    {headerMenu.items.map((item, idx) => {
                      const parentActive =
                        isActive(item.slug) ||
                        (item.items?.some((sub) => isActive(sub.slug)) ??
                          false);

                      return (
                        <li
                          key={item?.id ?? item?.slug ?? idx}
                          className={`nav-item dropdown ${
                            parentActive ? "active" : ""
                          }`}
                        >
                          <Link
                            className={`nav-link dropdown-toggle ${
                              parentActive ? "active" : ""
                            }`}
                            role="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                            href={normalize(item.slug)}
                          >
                            {item.title} <i className="ti-angle-down"></i>
                          </Link>

                          {item.items?.length > 0 && (
                            <ul className="dropdown-menu">
                              {item.items.map((subItem, subIdx) => {
                                const subActive = isActive(subItem.slug);
                                return (
                                  <li
                                    key={
                                      subItem?.id ??
                                      subItem?.slug ??
                                      subIdx
                                    }
                                  >
                                    <Link
                                      href={normalize(subItem.slug)}
                                      className={`dropdown-item ${
                                        subActive ? "active" : ""
                                      }`}
                                    >
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Desktop Primary CTA */}
                  <div className="d-none d-lg-flex ms-3">
                    <Link
                      href="/invest-now"
                      className="header-cta"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        general={general}
        headerMenu={headerMenu}
        isOpen={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        activePath={currentPath}
      />
    </>
  );
};

export default Header;
