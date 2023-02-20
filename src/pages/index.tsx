import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/styles.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Meu Bord - Organizador de Tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image 
          src="/imagens/board-user.svg"
          alt="Imagem do board"
          width={300}
          height={300}
        />

        <section className={styles.callToAction}>
          <h1>Uma ferramenta para seu dia a dia Escreva planeje organize-se</h1>
          <p><span>100% Gratuita</span> e online.</p>          
        </section>

        <h3 className={styles.titleDonaters}>Apoiadores:</h3>
        <div className={styles.donaters}>
      
            <img src="https://sujeitoprogramador.com/steve.png" alt="Usuário 1"/>                      
        </div>
      </main>
    </>
  )
}
