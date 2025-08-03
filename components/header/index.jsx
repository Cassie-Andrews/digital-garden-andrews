import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.header}>
      {props.isLoggedIn ? (
        <div className={styles.container}>
          <div className={styles.container}>
            <p className={styles.navlink}><Link href="/">Home</Link></p>
            <p className={styles.navlink}><Link href="/search">Search</Link></p>
            <p className={styles.navlink}><Link href="/collection">Collection</Link></p>
          </div>
          <div className={styles.container}>
            <p className={styles.welcome}>Welcome, {props.username}!</p>
            <p onClick={logout} style={{ cursor: "pointer" }} className={styles.navlink}>
              Logout
            </p>
          </div>
        </div>
      ) : (
        <>
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/login">Login</Link>
          </p>
        </>
      )}
    </header>
  );
}

