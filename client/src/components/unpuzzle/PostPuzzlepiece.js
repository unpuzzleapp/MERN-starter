/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { connect } from 'react-redux';
import { postPuzzlePieceStart } from '../../pages/PuzzleTweet/reducer';
import { clearError } from '../../store/reducers/uiReducer';
// import { postPuzzlepiece, clearErrors } from '../../redux/actions/dataActions';
import MyButton from '../../common/component/Button';

const styles = (theme) => ({
  ...theme.themeStyle,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 5,
    marginBottom: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '3%',
  },
});

const PostPuzzlepiece = (props) => {
  const [componentState, setComponentState] = useState({
    open: false,
    body: '',
    errors: {},
  });
  useEffect(() => {
    if (props.UI.errors) {
      setComponentState({ ...componentState, errors: props.UI.errors });
    }
    if (!props.UI.errors && !props.UI.loading) {
      setComponentState({
        ...componentState,
        body: '',
        open: false,
        errors: {},
      });
    }
  }, [props.UI.errors, props.UI.loading]);

  const handleOpen = () => {
    setComponentState({
      ...componentState,
      open: true,
    });
  };
  const handleClose = () => {
    props.clearErrors();
    setComponentState({
      ...componentState,
      open: false,
      errors: {},
    });
  };
  const handleChange = (event) => {
    setComponentState({
      ...componentState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.postPuzzlepiece({ body: componentState.body });
  };
  const { errors } = componentState;
  const {
    classes,
    UI: { loading },
  } = props;
  return (
    <Fragment key="post-puzzle">
      <MyButton onClick={handleOpen} tip="Post a Puzzlepiece!">
        <AddIcon />
      </MyButton>
      <Dialog
        open={componentState.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Puzzlepiece</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Puzzlepiece"
              multiline
              rows="2"
              placeholder="Post a puzzlepiece for people to unpuzzle"
              error={errors.body}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, {
  postPuzzlepiece: postPuzzlePieceStart,
  clearErrors: clearError,
})(withStyles(styles)(PostPuzzlepiece));
