import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  { 
    userId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    username: {
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
let Password;

try {
  Password = mongoose.model('Password');
  console.log("hello sweety")
} catch (error) {
  if (error.name === 'MissingSchemaError') {
    console.log("hello darling")
    Password = mongoose.model('Password', passwordSchema);
  } else {
    throw error;
  }
}

// Password = mongoose.models.Password || mongoose.model('Password', passwordSchema);


export default Password;
