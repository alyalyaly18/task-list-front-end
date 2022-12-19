import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';



const App = () => {
  // const initialCopy = TASKS.map((task) => {
  //   return { ...task };
  // });

  const [tasksList, setTasksList] = useState([]);

  const URL = 'http://localhost:5000/tasks';
  useEffect(()=>{
    axios.get(URL)
    .then((res) => {
      //console.log(res);
      const tasksAPIResCopy = res.data.map((task) => {
        return {
          ...task
      }})
      setTasksList(tasksAPIResCopy);
        
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const updateTask = (taskToUpdate) => {
    // console.log("updateTask called");
    axios.patch(`${URL}/${taskToUpdate.id}/mark_complete`)
    .then((res)=>{
      const updatedTasksList = tasksList.map((task) => {
         if (task.id === taskToUpdate.id) {
            return taskToUpdate;
          }
          return task;
         });
         setTasksList(updatedTasksList);
    })
    .catch((err)=>{
      console.log(err);
    });
  };
  // const updateTask = (taskToUpdate) => {
  //   console.log(taskToUpdate);
  //   const updatedTasksList = tasksList.map((task) => {
  //     if (task.id === taskToUpdate.id) {
  //       return taskToUpdate;
  //     }
  //     return task;
  //   });
  //   setTasksList(updatedTasksList);
  //   console.log(updatedTasksList);
  // };

  const deleteTask = (taskId) => {
   
    const newTasksList = [];
    for (const task of tasksList) {
      if (task.id !== taskId) {
        newTasksList.push(task);
      }
    }
    setTasksList(newTasksList);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={tasksList} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
