const { Router } = require("express");
const Roles = require("../../middlewares/AuthenticateRoles");
const PuzzlepieceController = require("../../controllers/Puzzlepiece");
const RateLimiter = require("../../middlewares/RateLimiter");
const SlowDown = require("../../middlewares/SlowDown");
const router = Router({ mergeParams: true });

router.post(
  "/",
  RateLimiter,
  Roles.Admin,
  PuzzlepieceController.saveValidation(),
  PuzzlepieceController.savePuzzlePiece
);

router.get("/", SlowDown, Roles.Any, PuzzlepieceController.getAllPuzzlepiece);

router.get("/:id", SlowDown, Roles.Any, PuzzlepieceController.getPuzzlepiece);

router.delete(
  "/:id",
  SlowDown,
  Roles.Any,
  PuzzlepieceController.deletePuzzlepiece
);

router.get("/:id/like", SlowDown, Roles.Any, PuzzlepieceController.likePiece);

router.get(
  "/:id/unlike",
  SlowDown,
  Roles.Any,
  PuzzlepieceController.unlikePiece
);
router.post(
  "/:id/comment",
  SlowDown,
  Roles.Any,
  PuzzlepieceController.commentValidation(),
  PuzzlepieceController.addComment
);

module.exports = router;
