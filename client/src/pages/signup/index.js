/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
// import { signupUser } from '../redux/actions/userActions';

const AppIcon = '/static/upLogo.svg';
const styles = (theme) => ({
  ...theme.themeStyle,
});

const Signup = (props) => {
  const [componentState, setComponentState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    errors: {},
  });
  useEffect(() => {
    if (props.UI.errors) {
      setComponentState({ ...componentState, errors: props.UI.errors });
    }
  }, [props.UI.errors, props.UI.loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComponentState({
      ...componentState,
      loading: true,
    });
    const newUserData = {
      email: componentState.email,
      password: componentState.password,
      confirmPassword: componentState.confirmPassword,
      handle: componentState.handle,
    };
    props.signupUser(newUserData, props.history);
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
  const { errors } = componentState;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="UnpuzzleLogo" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword}
            value={componentState.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle}
            value={componentState.handle}
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
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
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

export default connect(mapStateToProps, { signupUser: () => {} })(
  withStyles(styles)(Signup),
);

/* Random Commit
Concepts
1. onChange:
https://upmostly.com/tutorials/react-onchange-events-with-examples#add-onchange-handler-input
*/
