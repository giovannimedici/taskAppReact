import { useState } from 'react';
import './styles.css';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';

function App() {
  const [task, setTask] = useState('');
  const [taskList, settaskList] = useState([]);
  const [editedTask, seteditedTask] = useState(null);
  

  function add() {
    if(task === ''){
      alert('Preencher a tarefa');
      return;
    }
    settaskList([...taskList, {id: Date.now().toString(), title: task}])
    setTask('');
  }

  const remove = (id) => {
    const newList = taskList.filter((item) => item.id !== id)
    settaskList(newList);
  }

  function edit(item) {
    seteditedTask(item);
    setTask(item.title);
  }

  function update() {
    const updatedTaskList = taskList.map((item) => {
      if(item.id === editedTask.id){
        return { ...item, title: task}
      }

      return item;
    });

    settaskList(updatedTaskList);
    seteditedTask(null);
    setTask("");
  }

    const listItems = taskList.map((t) => {
      return <li key = {t.id}>
          <div>
            {t.title}
              <button className='buttonEdit' onClick={() => remove(t.id)}>
                <FiMinus size={20} color="#FFF"/>
              </button>
              <button className='buttonEdit' onClick={() => edit(t)}>
                <FiEdit size={20} color="#FFF"/>
              </button>
          </div>
        </li>
    });

  return (
    <div className="container">
      <h1 className="title">to-do-list app</h1>
      <div className="containerInput">
        <input
        type= "text"
        placeholder= "Digite a sua tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value) }
        />
        { !editedTask ? <button className='buttonAdd' onClick={add}>
          <FiPlus size={25} color="#FFF"/>
        </button> :
        <button className='buttonAdd' onClick={() => update()}>
        <FiEdit size={25} color="#FFF"/>
      </button>}
      </div>

      {taskList.length > 0 && 
        <div className='displayContainer'>
            <ul>{listItems}</ul>
        </div>
      }
    </div>
    
  );
}

export default App;
