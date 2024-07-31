import React from 'react'
import styles from '../styles/Header.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link to= "/" className={styles.brandName}>
                    <div >
                        E-Commerce Website
                    </div>
                </Link>
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