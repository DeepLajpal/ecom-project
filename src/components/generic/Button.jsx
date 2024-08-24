import styles from '../../styles/generic/Button.module.scss'

const Button = ({btnTxt="Button"}) => {
  return (
        <div className={styles.buttonContent}>
            <button className={styles.button}>
                {btnTxt}
            </button>
        </div>
  )
}

export default Button;