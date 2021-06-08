import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitCommentStart } from '../../pages/PuzzleTweet/reducer';
// import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.themeStyle,
});

const CommentForm = (props) => {
  const [componentState, setComponentState] = useState({
    body: '',
    errors: {},
  });
  useEffect(() => {
    if (props.UI.errors) {
      setComponentState({ ...componentState, errors: props.UI.errors });
    }
    if (!props.UI.errors && !props.UI.loading) {
      setComponentState({ ...componentState, body: '' });
    }
  }, [props.UI.errors, props.UI.loading]);

  const handleChange = (event) => {
    setComponentState({
      ...componentState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(props.puzzlepieceId, {
      body: componentState.body,
    });
  };
  const { classes, authenticated } = props;
  const { errors } = componentState;

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment}
          helperText={errors.comment}
          value={componentState.body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {
  submitComment: (id, data) => submitCommentStart({ id, data }),
})(withStyles(styles)(CommentForm));
