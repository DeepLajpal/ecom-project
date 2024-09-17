import styles from '../../styles/common/Button.module.scss'

const Button = ({btnTxt="Button", onClick}) => {
  
  return (
        <div className={styles.buttonContent}>
            <button onClick={onClick} className={styles.button}>
                {btnTxt}
            </button>
        </div>
  )
}

export default Button;