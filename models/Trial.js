import mongoose from "mongoose"

const trialSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  });

  export default mongoose.models.Trial || mongoose.model("Trial", trialSchema)

  