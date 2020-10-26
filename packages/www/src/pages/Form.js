import React, { useState } from "react";

const Form = () => {
  const [todo, setTodo] = useState({
    text: "",
    completed: false,
  });

  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([{ text: todo.text, completed: todo.completed }, ...todos]);
    setTodo({ text: "", completed: false });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-5">
          <label htmlFor="todo">Add Todo</label>
          <input
            type="text"
            className="form-control"
            value={todo.text}
            onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          />
        </div>
        <button className="btn-outline-info btn-block">ADD</button>
      </form>
      <ul className="list-group">
        {todos.map((el, i) => (
          <li className="list-group-item mt-2" key={i}>
            <input type="checkbox" checked={el.completed} />
            <span className="ml-2">{el.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
