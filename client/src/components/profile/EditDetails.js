/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// Redux
import { connect } from 'react-redux';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// import { editUserDetails } from '../../redux/actions/userActions';
import MyButton from '../../common/component/Button';

const styles = (theme) => ({
  ...theme.themeStyle,
  button: {
    float: 'right',
  },
});

const EditDetails = (props) => {
  const [componentState, setComponentState] = useState({
    bio: '',
    website: '',
    location: '',
    open: false,
  });
  const mapUserDetailsToState = (credentials) => {
    setComponentState({
      ...componentState,
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    });
  };
  const handleOpen = () => {
    setComponentState({ ...componentState, open: true });
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setComponentState({ ...componentState, open: false });
  };
  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);
  const handleChange = (event) => {
    setComponentState({
      ...componentState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: componentState.bio,
      website: componentState.website,
      location: componentState.location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };
  const { classes } = props;
  return (
    <Fragment key="edit details">
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={componentState.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="1"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={componentState.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={componentState.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={componentState.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails: () => {} })(
  withStyles(styles)(EditDetails),
);
