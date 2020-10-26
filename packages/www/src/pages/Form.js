import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!) {
    updateTodo(id: $id) {
      completed
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

const Form = () => {
  const [todo, setTodo] = useState({
    text: "",
    completed: false,
  });
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({ variables: { text: todo.text } });
    await refetch();
    setTodo({ ...todo, text: "" });
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
      {loading ? <h5>Loading...</h5> : null}
      {error ? <p className="text-danger">{error.message}</p> : null}
      <ul className="list-group">
        {!loading &&
          !error &&
          data.todos.map((el, i) => (
            <li className="list-group-item mt-2" key={i}>
              <input
                type="checkbox"
                checked={el.completed}
                onClick={async () => {
                  await updateTodo({ variables: { id: el.id } });
                  await refetch();
                }}
              />
              <span className="ml-2">{el.text}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Form;
