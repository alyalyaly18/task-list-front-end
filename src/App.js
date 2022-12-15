import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialCopy = TASKS.map((task) => {
    return { ...task };
  });

  const [tasksList, setTasksList] = useState(initialCopy);

  const updateTask = (taskToUpdate) => {
    console.log('Hi');
    console.log(taskToUpdate);
    const updatedTasksList = tasksList.map((task) => {
      if (task.id === taskToUpdate.id) {
        return taskToUpdate;
      }
      return task;
    });
    setTasksList(updatedTasksList);
    console.log(updatedTasksList);
  };
  // const deleteTask =(taskToUpdate)=>{
  //   const updatedTasksList = tasksList.map((task) => {
  //     if (task.id !== taskToUpdate.id) {
  //       return task;
  //   }});
  //   setTasksList(updatedTasksList);
  // };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={TASKS} updateTask={updateTask}  />
          {/* deleteTask={deleteTask} */}
        </div>
      </main>
    </div>
  );
};

export default App;
