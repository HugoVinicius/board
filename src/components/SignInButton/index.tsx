import styles from './styles.module.scss'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton(){

  const { data: session } = useSession();

  return session ? (
    <button
    type="button"
    className={styles.signInButtton}
    onClick={() => signOut()}    
    >      
      <Image src={String(session.user?.image)} 
      alt={String(session.user?.name)}
      width= {35}
      height= {35}
      />
      
      
      Olá {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button
    type="button"
    className={styles.signInButtton}
    onClick={() => signIn('github')}
    >
       <FaGithub color="#FFB800"/>
       Entrar com github
    </button>
  );  
}