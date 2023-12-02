import styles from '../../styles/login.module.css'

const Input = ({ inputType, spanText, onChange, name }) =>{ 

    return (
        <div className={styles.inputContainer}>
             <label className={styles.span1}>{spanText}</label>
             <input className={styles.usuario} type={inputType} required onChange={onChange} name={name}/>
        </div>
    )

}

export default Input;