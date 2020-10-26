import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../auth-context";
import Form from "./Form";

const Index = () => {
  const { user, netlifyIdentity } = useContext(AuthContext);
  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          {!user ? (
            <>
              <p className="lead">Login to add todo items</p>
              <button
                className="btn btn-primary btn-block"
                onClick={() => netlifyIdentity.open()}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h2>Welcome {user.user_metadata.full_name}</h2>
              <button
                className="btn btn-danger btn-block"
                onClick={() => netlifyIdentity.open()}
              >
                Logout
              </button>
              <Form />
            </>
          )}
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  );
};

export default Index;
