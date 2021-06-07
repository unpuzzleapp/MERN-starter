/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, Fragment } from 'react';

const Puzzle = (props) => {
  const [componentState] = useState({
    isEditMode: false,
    updatedPuzzleName: props.name,
  });
  return (
    <div className="tile is-child box notification is-success">
      {props.isAdmin && (
        <Fragment key="admin-view">
          <a
            href="/"
            onClick={handleProductEdit}
            className="product-edit-icon"
          />
          <button
            onClick={(event) => props.handleDeleteProduct(props.id, event)}
            className="delete"
          />
        </Fragment>
      )}
      {componentState.isEditMode ? (
        <div>
          <p>Edit puzzle name</p>
          <input
            className="input is-medium"
            type="text"
            placeholder="Enter name"
            value={componentState.updatedPuzzleName}
            onChange={onAddProductNameChange}
          />
          <p className="puzzle-id">id: {props.id}</p>
          <button
            type="submit"
            className="button is-info is-small"
            onClick={handleEditSave}
          >
            save
          </button>
        </div>
      ) : (
        <div>
          <p className="puzzle-title">{props.puzzleName}</p>
          <p className="puzzle-id">id: {props.id}</p>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
