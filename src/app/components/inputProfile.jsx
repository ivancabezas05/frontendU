import styles from '../../styles/profile.module.css'

const InputProfile = (props) =>{
    return (
        <div className={styles.label} >
            <label className={styles.placeholder} htmlFor="">{props.placeholder}</label>
            <input className={styles.input} type={props.inputType || 'text'} name={props.name} value={props.value}  onChange={props.onChange} required/>
        </div>
    )
}

export default InputProfile;