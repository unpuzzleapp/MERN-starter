/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, useNavigate } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { loadingUser } from './reducer';
// import { loginUser } from '../redux/actions/userActions';

const AppIcon = '/static/upLogo.svg';
const styles = (theme) => ({
  ...theme.themeStyle,
});

const Login = (props) => {
  const navigate = useNavigate();
  const [componentState, setComponentState] = useState({
    email: '',
    password: '',
    errors: {},
  });
  useEffect(() => {
    if (props.user.authenticated) {
      navigate('/'); // redirect to homepage after login
    }
  }, [props.user.authenticated]);
  useEffect(() => {
    if (props.UI.errors) {
      setComponentState({
        ...componentState,
        errors: {
          ...componentState.errors,
          general: props.UI.errors,
        },
      });
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: componentState.email,
      password: componentState.password,
    };
    props.loginUser(userData);
  };
  const handleChange = (event) => {
    setComponentState({
      ...componentState,
      [event.target.name]: event.target.value,
    });
  };
  const {
    classes,
    UI: { loading },
  } = props;
  // const classes = props.classes
  // const loading = props.UI.loading
  const { errors } = componentState;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="UnpuzzleLogo" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <p>Email: 1@user.com and Password: 123456</p>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email}
            value={componentState.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password}
            value={componentState.password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading} // button becomes disabled when 'loading' is true. You can tell by the style of the button once you click the button
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user || {},
  UI: state.UI || {},
});

const mapActionsToProps = {
  loginUser: loadingUser, // same thing as doing loginUser: loginUser; the key in the state would be called loginUser and the value would be the function that we imported from userActions.js
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(Login));

/*
Concepts
1. onChange:
https://upmostly.com/tutorials/react-onchange-events-with-examples#add-onchange-handler-input

Login completed
*/
