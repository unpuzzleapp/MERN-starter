/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Puzzlepiece from '../../components/unpuzzle/Puzzlepiece';
import StaticProfile from '../../components/profile/StaticProfile';

import PuzzlepieceSkeleton from '../../common/component/PuzzlepieceSkeleton';
import ProfileSkeleton from '../../common/component/ProfileSkeleton';

import { getUserData } from '../login/reducer';

const User = (props) => {
  const [componentState, setComponentState] = useState({
    profile: null,
    puzzlepieceIdParam: null,
  });
  useEffect(() => {
    const { handle } = props.match.params;
    const { puzzlepieceId } = props.match.params;

    if (puzzlepieceId)
      setComponentState({
        ...componentState,
        puzzlepieceIdParam: puzzlepieceId,
      });

    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setComponentState({
          ...componentState,
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const { puzzlepieces, loading } = props.data;
  const { puzzlepieceIdParam } = componentState;
  const puzzlepiecesMarkup = loading ? (
    <PuzzlepieceSkeleton />
  ) : puzzlepieces === null ? (
    <p>No puzzlepieces </p>
  ) : (
    puzzlepieces.map((puzzlepiece) => {
      if (puzzlepiece.puzzlepieceId !== puzzlepieceIdParam)
        return (
          <Puzzlepiece
            key={puzzlepiece.puzzlepieceId}
            puzzlepiece={puzzlepiece}
          />
        );
      return (
        <Puzzlepiece
          key={puzzlepiece.puzzlepieceId}
          puzzlepiece={puzzlepiece}
          openDialog
        />
      );
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {puzzlepiecesMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {componentState.profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={componentState.profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
