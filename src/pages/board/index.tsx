import Head from 'next/head'
import ptBR from 'date-fns/locale/pt-BR';
import {format} from 'date-fns'
import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import {  getSession } from "next-auth/react"
import firebase from '../../services/firebaseConnection';
import Link from 'next/link';

import styles from './styles.module.scss'
import {FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX, FiSave} from 'react-icons/fi'
import SupportButton from '@/components/SupportButton'


export type TaskList = {
  id: string;
  createdFormated?: string;
  created: string | Date;
  tarefa: string;
  userId: string;
  nome: string;
}

interface BoardProps{
  user:{
    id: string;
    name: string;
  }
  data: string;
}

export default function Board({user, data}: BoardProps){

  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);
  
  async function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (input === ''){
      alert("Informe o titulo da tarefa");
      return;
    }

    if (taskEdit) {
      await firebase.firestore().collection('tarefas')
            .doc(taskEdit.id)
            .update({ tarefa: input })
            .then(() => {
              let data = taskList;
              let index = taskList.findIndex(t => t.id === taskEdit.id);
              data[index].tarefa = input;
              
              setTaskList(data);
              setInput('');
              setTaskEdit(null);
            })
            .catch((err) => {console.error(err);});
              
      return;

    }
 
    let tarefa = {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.name
    }

    await firebase.firestore().collection('tarefas')
          .add(tarefa).then((doc) => {
            let data: TaskList = {...tarefa, id: doc.id, createdFormated: format(tarefa.created, 'dd MMMM yyyy', { locale: ptBR }) }
            console.log("Cadastrado com sucesso!");

            setTaskList([...taskList, data]);            
            setInput('');
          })
          .catch((err) => console.error(err));
  }

  async function handleExcluir(id:string) {
    await firebase.firestore().collection('tarefas')
          .doc(id).delete()
          .then(() => {

            let data = taskList.filter(t => {
              return t.id !== id
            });

            setTaskList([...data]);
          })
          .catch(err => console.error(err));
    
  }
  
  function handleEdit(task: TaskList) {
    setTaskEdit(task);   
    setInput(task.tarefa);
  }

  function handleCancelEdit(): void {
    setTaskEdit(null);
    setInput('');    
  }

  return(
    <>
      <Head>
        <title>Minhas Tarefas</title>
      </Head>
      <main className={styles.container}>

        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={() => handleCancelEdit()}>
              <FiX size={30} color="FF3636" />
            </button>
            Você esta editando uma tarefa
          </span>
        )}

        <form onSubmit={handleAddTask}>
          <input 
          type="text" 
          placeholder="Digite sua tarefa.."
          value={input}
          onChange={(e) => (setInput(e.target.value))}
          />

          <button type="submit">
            {taskEdit ?
             (<FiSave size={25} color="#17181f"/>) : 
             (<FiPlus size={25} color="#17181f"/>)
           }
                       
          </button>
        </form>

        <h1>Você tem {taskList.length} {taskList.length > 1 ? 'tarefas' : 'tarefa'}!</h1>

        <section>
          {taskList.map(task => (
            <article key={task.id} className={styles.taskList}>
              <Link href={`/board/${task.id}`}><p>{task.tarefa}</p></Link>
              <div className={styles.action}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button onClick={() => handleEdit(task)}>
                    <FiEdit2 size={20} color="#FFF" /> 
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleExcluir(task.id)}>
                  <FiTrash size={20} color="#FF3636"/>
                  <span>Excluir</span>
                </button>
              </div>    
            </article>
          ))}
        </section>                
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF"/>
          <time>
            Última doação foi a 3 dias.
          </time>
        </div>
      </div>

      <SupportButton/>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async ({req: NextApiRequest} ) => {
  const session = await getSession({req: NextApiRequest});

  if (!session) {
    return {
      redirect:{
        destination: '/',
        permanent:false,
      }
    }
  }

  const tasks = await firebase.firestore().collection('tarefas')
                .where('userId', '==', session?.id)
                .orderBy('created', 'asc').get();
  
  const data = JSON.stringify(tasks.docs.map(doc => {
    return {
      id: doc.id,
      createdFormated: format(doc.data().created.toDate(), 'dd MMMM yyyy', { locale: ptBR }),
      ...doc.data()    
    }
  })) 

  const user = {
    name: session?.user?.name,
    id: session?.id,    
  }
  
  return {
    props: {
      user,
      data
    }
  }
}