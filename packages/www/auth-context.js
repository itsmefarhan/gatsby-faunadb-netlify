const React = require("react");
const netlifyIdentity = require("netlify-identity-widget");

const AuthContext = React.createContext({});

exports.AuthContext = AuthContext;

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => setUser());

  return (
    <AuthContext.Provider value={{ netlifyIdentity, user }}>
      {children}
    </AuthContext.Provider>
  );
};

exports.AuthProvider = AuthProvider;
