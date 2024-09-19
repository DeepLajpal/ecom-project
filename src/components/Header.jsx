import styles from '../styles/Header.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {selectCartTotalItems} from '../features/cart/cartSelector'; 
import { useSelector } from 'react-redux';


const Header = () => {
    const cartTotalItems = useSelector(selectCartTotalItems)
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.brandNameContainer}> <Link to="/" className={styles.brandName}>E-Commerce Website</Link> </div>
                <div className={styles.profileIconContainer}> <CgProfile /> </div>
                <div className={styles.cartContainer}>
                    <div className={styles.cartIconContainer}>
                        <Link to={`/cart/${Math.floor(Math.random() * 10)}`} className={styles.cartIcon}> <FaCartShopping /> </Link>
                    </div>
                    <div className={styles.cartCircleContainer}><span className={styles.cartTotal}>{cartTotalItems}</span></div>
                </div>
            </div>
        </div >
    )
}

export default Header