import React from 'react'
import styles from '../styles/Header.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";


const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.brandName}>
                    E-Commerce Website
                </div>
                <div className={styles.profileIconContainer}>
                    <CgProfile />
                </div>
                <div className={styles.cartIconContainer}>
                    <FaCartShopping />
                </div>
            </div>
        </div>
    )
}

export default Header