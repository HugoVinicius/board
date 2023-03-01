import { GetServerSideProps} from 'next';
import ptBR from 'date-fns/locale/pt-BR';
import { getSession } from 'next-auth/react';
import firebase from '../../services/firebaseConnection';
import {format} from 'date-fns'
import {TaskList} from './index';
import styles from './task.module.scss';
import Head from 'next/head';
import { FiCalendar } from 'react-icons/fi';

interface TaskListProps {
  data: string
}

export default function Task({data} : TaskListProps){
  const task: TaskList = JSON.parse(data);

  return(
    <>
      <Head>
        <title>Detalhe da sua tarefa</title>
      </Head>
      <article className={styles.container} >
        <div className={styles.action}>
          <div>
            <FiCalendar size={30} color="#FFF"/>
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req: NextApiRequest, params} ) => {
  const {id} = params;  
  
  const session = await getSession({req : NextApiRequest});

  if (!session) {
    return {
      redirect:{
        destination: '/',
        permanent:false,
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
               .doc(String(id)).get()
               .then((snapshot) => {
                  const data = {
                    id: snapshot.id,
                    createdFormated: format(snapshot.data()?.created.toDate(), 'dd MMMM yyyy', { locale: ptBR }),
                    ...snapshot.data()
                  }

                  return JSON.stringify(data);
               });

  
    
  return {
    props: {
      data
    }
  }

}