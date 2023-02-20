
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent} >
        <Link href="/">
            <Image src="/imagens/logo.svg" alt="Logo Meu Board" width={60} height={60}/>
        </Link>
        <nav>
          <Link href="/">
            Home
          </Link>
          <Link href="/board">            
            Meu Board
          </Link>          
        </nav>

        <SignInButton/>
      </div>
    </header>
  );
}