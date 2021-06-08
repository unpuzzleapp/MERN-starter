/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import MyButton from '../../common/component/Button';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { getPuzzlePiece } from '../../pages/PuzzleTweet/reducer';
import { clearError } from '../../store/reducers/uiReducer';

const styles = (theme) => ({
  ...theme.themeStyle,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

const PuzzlepieceDialog = (props) => {
  const [componentState, setComponentState] = useState({
    open: false,
    oldPath: '',
    newPath: '',
  });
  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, puzzlepieceId } = props;
    const newPath = `/users/${userHandle}/puzzlepiece/${puzzlepieceId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    setComponentState({
      ...componentState,
      open: true,
      oldPath,
      newPath,
    });
    props.getPuzzlepiece(props.puzzlepieceId);
  };
  const handleClose = () => {
    window.history.pushState(null, null, componentState.oldPath);
    setComponentState({
      ...componentState,
      open: false,
    });
    props.clearErrors();
  };
  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  }, []);
  const {
    classes,
    puzzlepiece: {
      puzzlepieceId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments,
    },
    UI: { loading },
  } = props;
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={50} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton puzzlepieceId={puzzlepieceId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm puzzlepieceId={puzzlepieceId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <Fragment key="puzzle-dialog">
      <MyButton
        onClick={handleOpen}
        tip="Expand puzzlepiece"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
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
        <DialogContent className={classes.DialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  puzzlepiece: state.data.puzzlepiece,
  UI: state.UI,
});

const mapActionsToProps = {
  getPuzzlepiece: getPuzzlePiece,
  clearErrors: clearError,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(PuzzlepieceDialog));
