const mongoose = require("mongoose");
const { Schema } = mongoose;
const PuzzlePieceSchema = new Schema(
  {
    puzzlepieceId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    body: {
      type: String,
    },
    ppType: {
      type: String,
    },
    ppURL: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        body: String,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Auth",
        },
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auth",
      },
    ],

    /**
     * Add more fields as desired
     */
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
PuzzlePieceSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});
PuzzlePieceSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});
module.exports = mongoose.model("PuzzlePiece", PuzzlePieceSchema);
