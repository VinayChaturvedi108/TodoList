import React, { useEffect, useState } from 'react';
// import Create from './Create';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/add', { task: task })
      .then(result => location.reload())
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    console.log(id);
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => location.reload())
      .catch(err => console.log(err));
  }

  const handleDelete = (id)=>{
    axios.put(`http://localhost:3001/delete/${id}`)
    .then(result => location.reload())
    .catch(err => console.log(err));
  }

  return (
    <div className="home">
      <h2>Todo List</h2>
      <div className='create_from'>
        <input type="text" name="" value={task} onChange={(e) => { setTask(e.target.value) }} id="todo" placeholder='Enter Your Task' required />
        <button type='button' onClick={handleAdd}>Add</button>
      </div>
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(item => (
          <div className="task" key={item._id}>
            <div className='checkbox' onClick={() => handleEdit(item._id)}>
              {item.done ? <CheckBoxIcon/>:<p className="box"></p>}
              <p className={item.done ? "line_through": "box_sideText"}>{item.task}</p>
            </div>
            <div className='delBtn'>
              <span><DeleteIcon className='icon' onClick={()=>handleDelete(item._id)}/></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
