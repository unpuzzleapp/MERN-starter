const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const AuthSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "owner"],
    },
    password: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["Web", "Mobile"],
    },
    bio: {
      type: String,
      default: "Hello, I am unpuzzling",
    },
    handle: {
      type: String,
      default: "up1",
    },
    location: {
      type: String,
      default: "Toronto",
    },
    website: {
      type: String,
      default: "https://user.com",
    },
    imageUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/unpuzzle-ad500.appspot.com/o/8690998924153.png?alt=media",
    },
    

    /**
     * Add more fields as desired
     */
  },
  { timestamps: true }
);

// encrypt password before storing it in database
AuthSchema.pre("save", function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// A database method to compare password
AuthSchema.methods.comparePassword = function (candidatePassword) {
  const currentPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("Auth", AuthSchema);
