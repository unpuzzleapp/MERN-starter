const { body, validationResult } = require("express-validator");
const Puzzlepiece = require("../../config/database/mongoose/models/Puzzlepiece");
const Responser = require("../../lib/Responser");
const { NoDataAvailable } = require("../../lib/ErrorHandler");
const { mergeCreatedBy, mergeCreatedByList, mergeCommentsList } = require("../../helper/puzzlepiece");

class PuzzlepieceController {
  saveValidation = () => {
    return [
      body("body", "Puzzlepiece Body is required.")
        .exists()
        .isString()
        .withMessage("Invalid value for Email"),
    ];
  };

  savePuzzlePiece = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const puzzlepiece = new Puzzlepiece({
        ...req.body,
        createdBy: req.user.id,
      });
      await puzzlepiece.save();
      return Responser.success(
        200,
        "Puzzlepiece saved Successful",
        { ...puzzlepiece.toObject({ virtuals: true }) },
        res
      );
    } catch (error) {
      __logger.error("creation of puzzle piece failed: ", error);
      return Responser.failed(error, req, res, next);
    }
  };

  getPuzzlepiece = async (req, res, next) => {
    try {
      let puzzlepiece = await Puzzlepiece.findOne({
        puzzlepieceId: req.params.id,
      }).populate('createdBy', {
        handle: 1,
        imageUrl: 1
      }).populate('comments.userId', {
        handle: 1,
        imageUrl: 1
      })
      if (!puzzlepiece) {
        NoDataAvailable();
      }
      puzzlepiece = mergeCreatedBy(puzzlepiece.toJSON())
      puzzlepiece = mergeCommentsList(puzzlepiece)

      return Responser.success(200, "fetch Successful", puzzlepiece, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  getAllPuzzlepiece = async (req, res, next) => {
    try {
      let pieces = await Puzzlepiece.find({ isDeleted: false }).populate('createdBy', {
        handle: 1,
        imageUrl: 1
      })
      if (!pieces.length) {
        NoDataAvailable();
      }
      pieces = mergeCreatedByList(pieces)
      return Responser.success(200, "fetch Successful", pieces, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  deletePuzzlepiece = async (req, res, next) => {
    try {
      await Puzzlepiece.findOneAndUpdate(
        {
          puzzlepieceId: req.params.id,
        },
        {
          isDeleted: true,
        }
      );
      return Responser.success(200, "delete Successful", {}, res);
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  commentValidation = () => {
    return [
      body("body", "Comment Body is required.")
        .exists()
        .isString()
        .withMessage("Invalid value for Email"),
    ];
  };

  addComment = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error("Validation Failed");
        err.status = 400;
        next(err, req, res, next);
        return;
      }
      const comment = {
        body: req.body.body,
        userId: req.user.id,
      };
      const piece = await Puzzlepiece.findOneAndUpdate(
        {
          puzzlepieceId: req.params.id,
        },
        {
          $push: { comments: comment },
        }
      );
      return Responser.success(
        200,
        "Comment added successful",
        { ...comment },
        res
      );
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  likePiece = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const puzzlepieceId = req.params.id;

      const piece = await Puzzlepiece.findOneAndUpdate(
        {
          puzzlepieceId,
        },
        {
          $addToSet: { likes: userId},
        }
      );
      let puzzlepiece = await Puzzlepiece.findOne({
        puzzlepieceId: puzzlepieceId
      }).populate('createdBy', {
        handle: 1,
        imageUrl: 1
      }).populate('comments.userId', {
        handle: 1,
        imageUrl: 1
      })
      if (!puzzlepiece) {
        NoDataAvailable();
      }
      puzzlepiece = mergeCreatedBy(puzzlepiece.toJSON())
      puzzlepiece = mergeCommentsList(puzzlepiece)

      return Responser.success(
        200,
        "Like added successful",
        { ...puzzlepiece },
        res
      );
    } catch (error) {
      __logger.error(error.toString());
      return Responser.failed(error, req, res, next);
    }
  };

  unlikePiece = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const puzzlepieceId = req.params.id;
  
        const piece = await Puzzlepiece.findOneAndUpdate(
          {
            puzzlepieceId,
          },
          {
            $pull: { likes: userId},
          }
        );
        let puzzlepiece = await Puzzlepiece.findOne({
          puzzlepieceId: puzzlepieceId
        }).populate('createdBy', {
          handle: 1,
          imageUrl: 1
        }).populate('comments.userId', {
          handle: 1,
          imageUrl: 1
        })
        if (!puzzlepiece) {
          NoDataAvailable();
        }
        puzzlepiece = mergeCreatedBy(puzzlepiece.toJSON())
        puzzlepiece = mergeCommentsList(puzzlepiece)
  
        return Responser.success(
          200,
          "Like removed successful",
          { ...puzzlepiece },
          res
        );
      } catch (error) {
        __logger.error(error.toString());
        return Responser.failed(error, req, res, next);
      }
  };
}

module.exports = new PuzzlepieceController();
