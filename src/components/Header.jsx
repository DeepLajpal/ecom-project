import React, { useState } from 'react'
import styles from '../styles/Header.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Header = () => {
    const [cartId, setCartId] = useState(0);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.brandNameContainer}> <Link to="/" className={styles.brandName}>E-Commerce Website</Link> </div>
                <div className={styles.profileIconContainer}> <CgProfile /> </div>
                <div className={styles.cartIconContainer}> <Link to={`/cart/${cartId}`} className={styles.cartIcon}> <FaCartShopping /> </Link> </div>
            </div>
        </div>
    )
}

export default Header