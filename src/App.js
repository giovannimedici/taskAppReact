import { useState, useEffect, setState } from "react";
import "./styles.css";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import api from "./api";

function App() {
  const [task, setTask] = useState("");
  const [taskList, settaskList] = useState([]);
  const [editedTask, seteditedTask] = useState(null);

  useEffect(() => {
    api
      .get()
      .then((response) => settaskList(response.data))
      .catch((err) => {
        console.error(err.message);
      });
  });

  function add() {
    if (task === "") {
      alert("Preencher a tarefa");
      return;
    }
    const obj = {
      title: task,
    };

    try {
      api.post("http://localhost:3333/tasks", obj).then((response) => {
        console.log(response.status, response.data);
      });
    } catch (err) {
      console.log(err);
    }
    
    setTask("");
  }

  const remove = (id) => {
    api.delete(`http://localhost:3333/tasks/${id}`);
  };

  function edit(item) {
    seteditedTask(item);
    setTask(item.title);
  }

  function update() {
    const obj = {
      title: task,
    };

    api
      .put(`http://localhost:3333/tasks/${editedTask.id}`, obj)

    setTask("");
    seteditedTask(null)
  }

  const listItems = taskList.map((t) => {
    return (
      <li key={t.id}>
        <div className="displayContainer">
          {t.title}
          <div className="displayButtons">
            <button className="buttonEdit" onClick={() => remove(t.id)}>
              <FiMinus size={20} color="#FFF" />
            </button>
            <button className="buttonEdit" onClick={() => edit(t)}>
              <FiEdit size={20} color="#FFF" />
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="container">
      <h1 className="title">to-do-list app</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {!editedTask ? (
          <button className="buttonAdd" onClick={add}>
            <FiPlus size={25} color="#FFF" />
          </button>
        ) : (
          <button className="buttonAdd" onClick={update}>
            <FiEdit size={25} color="#FFF" />
          </button>
        )}
      </div>

      {taskList.length > 0 && <div className="divList">{listItems}</div>}
    </div>
  );
}

export default App;
