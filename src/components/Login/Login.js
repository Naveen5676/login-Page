import React, { useState , useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const[entredCollege , setEnteredColege]=useState('');
  const[collegeIsValid , setCollegeIsValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('checking for validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 && entredCollege.trim().length >6
      );
    },500);
   return ()=>{
    console.log('CLEANUP');
    clearTimeout(identifier);
   }
 
  },[setFormIsValid , enteredEmail , enteredPassword, entredCollege]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


  };

  const collegeChangeHandler=(event)=>{
    setEnteredColege(event.target.value);

  }
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegehandler=()=>{
    setCollegeIsValid(entredCollege.trim().length>6);
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
             collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="College">College name</label>
          <input
            type="text"
            id="collegename"
            value={entredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegehandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;