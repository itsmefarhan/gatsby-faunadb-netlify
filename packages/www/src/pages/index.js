import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../auth-context";

const Index = () => {
  const { user, netlifyIdentity } = useContext(AuthContext);
  return (
    <div className="container">
      <h1>Todo App</h1>
      {!user ? (
        <>
          <p className="lead">Login to add todo items</p>
          <button
            className="btn btn-primary"
            onClick={() => netlifyIdentity.open()}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h2>Welcome {user.user_metadata.full_name}</h2>
          <button
            className="btn btn-danger"
            onClick={() => netlifyIdentity.open()}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Index;
