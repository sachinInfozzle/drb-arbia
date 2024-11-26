import { useState, useEffect } from "react";
import "../style/header.css"; 
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// API call function (Replace the URL with your backend API endpoint)
const fetchMenuData = async (locale) => {
  try {
    const response = await fetch(`http://localhost:1337/api/header?populate=*&locale=${locale}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return null;
  }
};

const fetchSiteSettings = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/setting?populate=*");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return null;
  }
};

const Header = () => {

  const [menuItems, setMenuItems] = useState([]);
  const [booknow, setBooknow] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Track active submenu
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('en')
  const router = useRouter();
  const { locale, asPath } = router;

  const changeLanguage = (lang) => {
    router.push(asPath, asPath, { locale: lang });
    setCurrentLang(lang);
    if (lang === 'ar') {
      document.body.classList.add('lang-ar');
    } else {
      document.body.classList.remove('lang-ar');
    }
  };

   // Handler to toggle the class
   const toggleClass = (e) => {
    e.preventDefault();  // Prevent the default anchor behavior (like page navigation)
    setIsActive(!isActive);  // Toggle the class on the anchor
  };

  // Fetch menu data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMenuData(locale);
      if (data) {
        setMenuItems(data.Menus);
        setBooknow(data.book_now);
      } else {
        setError("Failed to load menu items");
      }
      setLoading(false);

      const sitedata = await fetchSiteSettings();
      setLogo(sitedata.Logo.url);
    };

    fetchData();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [menuItems]);

  // Toggle submenu visibility
  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  if (loading) {
    return ;
  }

  if (error) {
    return ;
  }

  return (
    <header className="header">
      <div className="container-fluid">
        

        <nav className="navbar navbar-expand-lg header-nav custom-row-reverse">

        <div className="custom-first-section">
          {/* Logo */}
          <div className="navbar-header">
            <button id="mobile_btn" className="navbar-toggler">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <Link href="/" className="navbar-brand logo">
              <img src={`http://localhost:1337${logo}`} alt="Logo" />
            </Link>
          </div>
          </div>



<div className="custom-second-section">
          {/* Menu */}
          <div className="main-menu-wrapper">
            <ul className="main-nav custom-row-reverse">
            {menuItems.map((menu) => (
              <li key={menu.id} className='nav-item'>
                <Link href={menu.Link} className="nav-link">
                  {menu.Title}
                </Link>
              </li>
            ))}
            {/* <li className="nav-item responsive-link">
                <Link href={booknow.Link} target="_blank" className="nav-link book-button">
                  {booknow.Title}
                </Link>
              </li> */}
            </ul>
            </div>
            </div>


            <div className="custom-third-section">
            <ul className="nav header-navbar-rht custom-row-reverse">
          <li className="nav-item">
        <a
          href="https://drbarabia.book-onlinenow.net/index.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {booknow.Title}
        </a>
      </li>
      <li className="nav-item dropdown">
        <div className="flag-dropdown">
          <a
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            onClick={toggleClass}
            className={`dropdown-toggle nav-link ${isActive ? 'show' : ''}`}
          >
            <img
              src="http://localhost:1337/uploads/globe_icon_080fadd2c5.svg"
              alt=""
              height="20"
              className="flag-img"
            />
            {/* <img
              src=("earth-grid_black.png")}
              alt=""
              height="20"
              className="flag-img dark-img"
              style={{ display: isDarkMode ? "block" : "none" }}
            /> */}
            <span>{currentLang == 'en' ? 'EN' : 'عربي'}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a
              className="dropdown-item"
              onClick={() => changeLanguage("en")}
            >
              English
            </a>
            <a
              className="dropdown-item"
              onClick={() => changeLanguage("ar")}
            >
              عربي
            </a>
          </div>
        </div>
      </li>
    </ul>
    </div>
            
            
            {/* <ul className="main-nav custom-row-reverse">
              {menuItems.map((menu) => (
                <li key={menu.id} className={`nav-item ${menu.subMenu ? "has-submenu" : ""}`}>
                  <Link href={menu.link} className="nav-link">
                    {menu.title}
                    {menu.subMenu && (
                      <button
                        className="submenu-toggle"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubmenu(menu.id);
                        }}
                      >
                        <i className={`fas fa-chevron-right ${activeSubmenu === menu.id ? "submenu-open" : ""}`}></i>
                      </button>
                    )}
                  </Link>
                  {menu.subMenu && (
                    <ul
                      className="submenu custom-right-align"
                      style={{
                        display: activeSubmenu === menu.id && isMobile ? "block" : "none",
                      }}
                    >
                      {menu.subMenu.map((sub) => (
                        <li key={sub.id}>
                          <Link href={sub.link}>{sub.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="nav-item responsive-link">
                <Link href="https://drbarabia.book-onlinenow.net/index.aspx" target="_blank" className="nav-link">
                  Book Now
                </Link>
              </li>
            </ul> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
