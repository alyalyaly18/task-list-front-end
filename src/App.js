import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

const App = () => {
  // const initialCopy = TASKS.map((task) => {
  //   return { ...task };
  // });

  const [tasksList, setTasksList] = useState([]);

  const URL = 'http://127.0.0.1:5000/tasks';
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        //console.log(res);
        const tasksAPIResCopy = res.data.map((task) => {
          return {
            ...task,
            isComplete: task.is_complete,
          };
        });
        setTasksList(tasksAPIResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateTask = (taskToUpdate) => {
    // console.log("updateTask called");
    axios
      .patch(`${URL}/${taskToUpdate.id}/mark_complete`)
      .then((res) => {
        const updatedTasksList = tasksList.map((task) => {
          if (task.id === taskToUpdate.id) {
            return taskToUpdate;
          }
          return task;
        });
        setTasksList(updatedTasksList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (taskId) => {
    // console.log("deleteTask Called");
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTasksList = [];
        for (const task of tasksList) {
          if (task.id !== taskId) {
            newTasksList.push(task);
          }
        }
        setTasksList(newTasksList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTask = (newTaskInfo) => {
    axios
      .post(URL, newTaskInfo)
      .then((response) => {
        //fetchAllBikes();  //<- This helper function will make a .get() call to fetch all bikes and update the state variable to display them
        const newTasks = [...tasksList];
        const newTaskJSON = {
          ...newTaskInfo,
          id: response.data.task.id,
          isComplete: false, // Why id in quotation
        };
        newTasks.push(newTaskJSON);
        setTasksList(newTasks); //this method does not require a .get request; we are pushing the bike data to the bikes list and using the setter to trigger a rerender.
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasksList}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          <NewTaskForm addTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
