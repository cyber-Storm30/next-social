"use client";
import React from "react";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Links: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();
  const handleNavigate = (val: string) => {
    router.push(`/${val}`);
  };
  const links = [
    {
      title: "",
      path: "",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    router.push("/login");
    dispatch(logout());
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <p className={styles.logoText}>SocialHubb</p>
          </Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {pathname === "/login" || pathname === "/signup" ? (
          <div className={styles.authButtonWrapper}>
            <button
              className={styles.authButton}
              onClick={() => handleNavigate("login")}
            >
              Login
            </button>
            <button
              className={styles.authButtonAlt}
              onClick={() => handleNavigate("signup")}
            >
              Join SocialHubb
            </button>
          </div>
        ) : (
          <div className={styles.options}>
            {user && (
              <form action={handleLogout}>
                <button className={styles.authButton}>Logout</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;
