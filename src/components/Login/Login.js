import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../stateStore/auth-context";

import classes from "./Login.module.css";

console.log(
  "Arranca Reducer. Se definen valorese del objeto con propiedades isValid y val"
);
const emailReducer = (ultimoState, accionTrigger) => {
  if (accionTrigger.type === "USER_INPUT") {
    return {
      value: accionTrigger.val,
      isValid: accionTrigger.val.includes("@"),
    };
  }
  if (accionTrigger.type === "INPUT_BLUR") {
    return {
      value: ultimoState.value,
      isValid: ultimoState.value.includes("@"),
    };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (ultimoState, accionTrigger) => {
  if (accionTrigger.type === "USER_INPUT") {
    return {
      value: accionTrigger.val,
      isValid: accionTrigger.val.trim().length > 6,
    };
  }
  if (accionTrigger === "INPUT_BLUR") {
    return {
      value: ultimoState.value,
      isValid: ultimoState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  console.log("Arranca función Login");
  //Estos estados quedan sin usar por useReduce(); que se utiliza cuando tenemos states que dependen de otros estados
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const objetoIsValid = { value: "", isValid: null };

  const [stateEmail, emailDispatch] = useReducer(emailReducer, objetoIsValid);
  const [statePassword, passwordDispatch] = useReducer(
    passwordReducer,
    objetoIsValid
  );

  const contextAuth = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("useEffect corriendo ");
  }, []);

  //Creamos 2 objetos que "nombran" a la posición para que useEffect() no corra cada vez que se modifica el estado de los inputs
  //Desestructuración de objetos
  const { isValid: emailIsValid } = stateEmail;
  const { isValid: passwordIsValid } = statePassword;

  useEffect(() => {
    console.log("Clickeando en el form");
    const timeHandler = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timeHandler);
      console.log("Reseteamos contador");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //Queda obsoleto por useReduce (aclaración arriba)
    //setEnteredEmail(event.target.value);

    console.log("Empieza validación emailChangeHandler");
    emailDispatch({ type: "USER_INPUT", val: event.target.value });
    console.log("Email: Se define objeto con las propiedades type y val");

    //setFormIsValid(event.target.value.includes("@") && statePassword.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatch({ type: "USER_INPUT", val: event.target.value });
    console.log("Password: Se define objeto con las propiedades type y val");

    //setFormIsValid(stateEmail.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    //Queda obsoleto por useReduce (aclaración arriba)
    //setEmailIsValid(stateEmail.isValid);
    emailDispatch({ type: "INPUT_BLUR" });
    console.log("Email: Se redefine objeto con la propiedad type");
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({ type: "INPUT_BLUR" });
    console.log("Password: Se redefine objeto con la propiedad type");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      contextAuth.onLogin(stateEmail.value, statePassword.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }

    console.log(
      "En login, se pasa el valor de la propiedad dentro de stateEmail, y el estado de la Password"
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={stateEmail.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={statePassword.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          {/* Sacamos la propiedad disabled 
          <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
