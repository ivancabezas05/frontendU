'use client'

import styles from '../../styles/recoverPass.module.css'
import Input from '../components/inputForm'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { actualizarContrasena } from '@/functionalities/formActions';

const RecoverPassPage = () => {
  const [state, setState] = useState({ correo: '', nroDoc: '', nuevacontra: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpdatePassword = (e) => {
    actualizarContrasena(e,state,router);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}> 
        <form className={styles.registro} onSubmit={handleUpdatePassword}>
          <Input inputType="text" spanText="Correo" name="correo" value={state.correo} onChange={handleChange} />
          <Input inputType="text" spanText="Número de documento" name="nroDoc" value={state.nroDoc} onChange={handleChange} />
          <Input inputType="password" spanText="Nueva Contraseña" name="nuevacontra" value={state.nuevacontra} onChange={handleChange} />
          <div className={styles.label2}>
            <div className={styles.opcion}>
              <button className={styles.button1} type="submit">Actualizar</button>
            </div>
          </div> 
        </form>
      </div> 
    </div>
  );
}

export default RecoverPassPage;