import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

// If you find any alternative to this then please change this fatty code.
let User;

try {
  User = mongoose.model('User');
} catch (error) {
  if (error.name === 'MissingSchemaError') {
    User = mongoose.model('User', userSchema);
  } else {
    throw error;
  }
}




export default User;
