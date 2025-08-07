import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import React, { useState } from "react";
import Image from "next/image";

export default function Header({ isLoggedIn, username }) {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        {/*site title*/}
        <p className={styles.title}><Link href="/">Website Title</Link>
        </p>
          
        {/*nav hamburger menu*/}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>


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
    </header>
  );
}
