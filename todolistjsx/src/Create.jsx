import React, { useState } from 'react'
import axios from 'axios';
const Create = () => {
  const [task, setTask] = useState('')
  const handleAdd = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/add', {task: task})
    .then(result => console.log(result), window.alert("Your Task is Added"))
    .catch(err=>console.log(err))
  }
  return (
    <div className='create_from'>
      <input type="text" name="" value={task} onChange={(e)=>{setTask(e.target.value)}} id="todo" placeholder='Enter Your Task' required/>
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
