import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});
console.log("Se crea contexto de autorización");

export const AuthContextProvider = (props) => {
  console.log("Creo componente de autentificación");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("Se crea useState para estado de Loggeo");

  useEffect(() => {
    const infoUsuarioLoggeado = localStorage.getItem("isLoggedIn");

    if (infoUsuarioLoggeado === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    console.log("Se desloguea el usuario");
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
    console.log("Se loguea el usuario");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
