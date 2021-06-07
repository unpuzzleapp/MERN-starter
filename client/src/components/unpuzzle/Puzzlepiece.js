/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import MyButton from '../../common/component/Button';
import DeletePuzzlepiece from './DeletePuzzlepiece';
import PuzzlepieceDialog from './PuzzlepieceDialog';
import LikeButton from './LikeButton';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 110,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Puzzlepiece = (props) => {
  dayjs.extend(relativeTime);
  const {
    classes,
    puzzlepiece: {
      body,
      createdAt,
      userImage,
      userHandle,
      puzzlepieceId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;
  // const classes = props.classes *Destructuring concept*
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePuzzlepiece puzzlepieceId={puzzlepieceId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton puzzlepieceId={puzzlepieceId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <PuzzlepieceDialog
          puzzlepieceId={puzzlepieceId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Puzzlepiece));
