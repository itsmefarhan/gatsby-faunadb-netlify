const React = require("react");
const { AuthProvider } = require("./auth-context");

module.exports = ({ element }) => <AuthProvider>{element}</AuthProvider>;
