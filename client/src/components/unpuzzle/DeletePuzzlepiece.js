/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import MyButton from '../../common/component/Button';
import { deletePuzzlePieceStart } from '../../pages/PuzzleTweet/reducer';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
};

const DeletePuzzlepiece = (props) => {
  const [componentState, setComponentState] = useState({
    open: false,
  });
  const handleOpen = () => {
    setComponentState({ open: true });
  };
  const handleClose = () => {
    setComponentState({ open: false });
  };
  const deletePuzzlepiece = () => {
    props.deletePuzzlepiece(props.puzzlepieceId);
    setComponentState({ open: false });
  };
  const { classes } = props;
  return (
    <Fragment key="delete-puzzle">
      <MyButton
        tip="Delete Puzzlepiece"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={componentState.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this puzzlepiece?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePuzzlepiece} color="secondary">
            Delete Puzzlepiece
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { deletePuzzlepiece: deletePuzzlePieceStart })(
  withStyles(styles)(DeletePuzzlepiece),
);
