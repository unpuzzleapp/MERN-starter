/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { connect } from 'react-redux';
import { AWS_CONFIG } from '../../constant/apiRoute';
import Puzzlepiece from '../../components/unpuzzle/Puzzlepiece';
import Profile from '../../components/profile/Profile';
import PuzzlepieceSkeleton from '../../common/component/PuzzlepieceSkeleton';
// import { getPuzzlepieces } from '../redux/actions/dataActions';

const PuzzleTweet = (props) => {
  const [puzzles, setPuzzles] = useState([]);

  const fetchPuzzles = async () => {
    try {
      const res = await axios.get(`${AWS_CONFIG}/puzzle`);
      setPuzzles(res.data);
    } catch (err) {
      console.log(`An error has occured ${err} ${puzzles}`);
    }
  };

  useEffect(() => {
    fetchPuzzles();
    // props.getPuzzlepieces();
  }, []);
  const { puzzlepieces = [], loading } = props.data;
  const recentPuzzlepiecesMarkup = !loading ? (
    puzzlepieces.map((puzzlepiece) => (
      <Puzzlepiece key={puzzlepiece.puzzlepieceId} puzzlepiece={puzzlepiece} />
    ))
  ) : (
    <PuzzlepieceSkeleton />
  );
  return (
    <Fragment key="puzzle-tweet">
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPuzzlepiecesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.data || {},
});
export default connect(mapStateToProps, { getPuzzlepieces: () => {} })(
  PuzzleTweet,
);
