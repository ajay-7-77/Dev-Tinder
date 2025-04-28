const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      required: true, // boolean value or function returning boolean value, mongoose dont let document to register in db if it is missing
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // only documents having unique email id allowed
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId data is not allowed");
        }
      },
    },
    password: {
      type: String,
      password: true,
      validate(value) {
        console.log('chceck', value);
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not allowed");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/search/images?p=photo+blank&fr=mcafee&type=E210IN826G0&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F650%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg#id=-1&iurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F280%2F650%2Flarge_2x%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg&action=click",
    },
    about: {
      type: String,
      default: "Default Description", // automaticallly present for every docuemnt registration
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // createAt and UpdatedAt timestamp
  }
);

// arrow fucntion will not work, need this
userSchema.methods.getJWT = async function () {
  const user = this;
  const token =  await jwt.sign({ _id: user._id }, "SecretKey@123", {
    expiresIn : '1h',
  });
  return token;
}
userSchema.methods.validatePassword = async function (password) {
  const user = this;
   const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
