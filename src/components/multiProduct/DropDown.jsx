import styles from '../../styles/multiProduct/DropDown.module.scss'
import { useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const DropDown = ({ heading, list }) => {
    const [filterOpen, setFilterOpen] = useState(true);
    const handleCheckBox = (e)=>{
        // if (e.nativeEvent.target.checked) {
            
        // }
        // console.log(e.nativeEvent.target.checked);
        // console.dir(e.nativeEvent.target.attributes.id.textContent); 
    }
    return (
        <div className={styles.dropDownContainer}>
            <div className={styles.dropDownContent}>
                <div className={styles.dropDownHeadingContainer}>
                    <div className={styles.dropDownHeadingContent} onClick={() => setFilterOpen(prev => !prev)}>
                        <span className={styles.dropDownHeading}>{heading}</span>
                        <span className={styles.arrowContainer}>{filterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                    </div>
                </div>

                <div className={filterOpen ? styles.dropDownListContainer : styles.hidden}>
                    <div className={styles.dropDownListContent}>

                        {list?.map((listItem) => {
                            return (<div key={listItem} className={styles.dropDownItemContainer}>
                                <input className={styles.dropDownItemInput} onClick={(e)=> handleCheckBox(e)} type="checkbox" id={"dropDownItemInput" + listItem}/>
                                <label className={styles.dropDownItemLabel} htmlFor={"dropDownItemInput" + listItem}>{listItem}</label>
                            </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </div>
    )
}
 
export default DropDown