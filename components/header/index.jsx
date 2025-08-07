import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import React, { useState, useRef, useEffect } from "react";

export default function Header({ isLoggedIn, username }) {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  
  /* close menu with outside click */
  useEffect(() => {
    function handleClickOutside(event) {
      if(menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        {/* site title */}
        <p className={styles.title}><Link href="/">Website Title</Link>
        </p>
          
        {/*nav hamburger menu*/}
        <div className={styles.navRight} ref={menuRef}>
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>

          {/* dropdown menu - logged in vs not logged in */}
          {isOpen && (
            <nav className={styles.menu}>
              <ul>
                {isLoggedIn ? (
                  <>
                    <li className={styles.welcome}>Welcome, {username}!</li>
                    <li className={styles.navlink}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navlink}>
                      <Link href="/search">Search</Link>
                    </li>
                    <li className={styles.navlink}>
                      <Link href="/collection">My Collection</Link>
                    </li>
                    <li 
                      className={styles.navlink}
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li className={styles.navlink}>
                      <Link href="/signup">Sign Up</Link>
                    </li>
                    <li className={styles.navlink}>
                      <Link href="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
