import styles from './styles.module.scss'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton(){

  const session = false;

  return session ? (
    <button
    type="button"
    className={styles.signInButtton}
    onClick={() => {}}    
    >      
      <img src="https://sujeitoprogramador.com/steve.png" 
      alt="Imagem do Fulano"/>
      
      
      Olá Matheus
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button
    type="button"
    className={styles.signInButtton}
    onClick={() => {}}
    >
       <FaGithub color="#FFB800"/>
       Entrar com github
    </button>
  );  
}