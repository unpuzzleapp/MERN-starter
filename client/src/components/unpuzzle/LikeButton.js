/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import MyButton from '../../common/component/Button';
import { doLike, doUnLike } from '../../pages/PuzzleTweet/reducer';
// import {
//   likePuzzlepiece,
//   unlikePuzzlepiece,
// } from '../../redux/actions/dataActions';

export const LikeButton = (props) => {
  const likedPuzzlepiece = () => {
    if (
      props.user.likes &&
      props.user.likes.find(
        (like) => like.puzzlepieceId === props.puzzlepieceId,
      )
    )
      return true;
    return false;
  };
  const likePuzzlepiece = () => {
    props.likePuzzlepiece(props.puzzlepieceId);
  };
  const unlikePuzzlepiece = () => {
    props.unlikePuzzlepiece(props.puzzlepieceId);
  };
  const { authenticated } = props.user;
  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPuzzlepiece() ? (
    <MyButton tip="Undo like" onClick={unlikePuzzlepiece}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePuzzlepiece}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePuzzlepiece: doLike,
  unlikePuzzlepiece: doUnLike,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
