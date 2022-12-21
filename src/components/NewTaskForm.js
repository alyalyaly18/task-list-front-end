import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';


const INITIAL_FORM_DATA ={
  title : '',
  description : ''
};
const NewTaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const handleChange = (e) =>{
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleNewTaskSubmit =(e)=>{
    e.preventDefault();
    addTask(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <label htmlFor="title">Task title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value ={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Task description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input type="submit" value="Add task"/>

    </form>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default NewTaskForm;