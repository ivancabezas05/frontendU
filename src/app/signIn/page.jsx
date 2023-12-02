"use client"

import styles from '../../styles/signIn.module.css'
import Input from '../components/inputForm'
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { registrarUsuario } from '@/functionalities/formActions';

const SignInPage = () =>{
  
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    nroDocumento: '',
    correo: '',
    password: '',
    confirmarPassword: '',
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    registrarUsuario(e,formData,setRegistroExitoso,router);
  };
  

    return (
    <div className={styles.container}>
    <div className={styles.texto}>   
        <span className={styles.spa1}>Sistema de reserva de libros</span>
        <span className={styles.spa2}>Registro de usuario</span>
    </div>
        <form className={styles.section} onSubmit={handleSubmit}>
            <div className={styles.form} >
            <span className={styles.spa3}>Datos Personales</span>
            <Input spanText="Nombres" inputType="text" value={formData.nombres} onChange={handleInputChange} required name="nombres"/>
            <Input spanText="Apellidos" inputType="text" value={formData.apellidos} onChange={handleInputChange} required name ="apellidos"/>
            <Input spanText="Tipo de Documento" inputType="text" value={formData.tipoDocumento} onChange={handleInputChange} required  name= "tipoDocumento"/>
            <Input spanText="Nro de Documento" inputType="text" value={formData.nroDocumento} onChange={handleInputChange} required name= "nroDocumento"/>
            </div>
            <div className={styles.form} >
            <span className={styles.spa3}>Datos de la cuenta</span>
            <Input spanText="Correo Electronico" inputType="email" value={formData.correoElectronico} onChange={handleInputChange} required name= "correo"/>
            <Input name="password" spanText="Password" inputType="password" value={formData.password} onChange={handleInputChange} required />
            <Input name="confirmarPassword" spanText="Ingrese Password Nuevamente" inputType="password" value={formData.confirmarPassword} onChange={handleInputChange} required />
            {registroExitoso && (
              <div className={styles.exitoso}>Usuario registrado correctamente.</div>
            )}
            <div className={styles.boton}>
              <Link href="./login"><button type="submit" onClick={handleSubmit}>Registrar</button></Link>
            </div>
            </div>
          </form>
    </div>
    )
}

export default SignInPage