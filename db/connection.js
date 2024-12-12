import mongoose from "mongoose";

let url =
  // process.env.MONGO_URL ||
  "mongodb+srv://akeel:shark234@devnote.wu0g9.mongodb.net/?retryWrites=true&w=majority&appName=devnote";

// Uncomment to debug Mongoose queries
// mongoose.set('debug', true)

let mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// This is for Model.findByIdAndUpdate method, specifically the so that { new: true} is the default
// Learn more: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
mongoose.set("returnOriginal", false);

// Setup connection for MongoDB
// https://mongoosejs.com/docs/connections.html#connections
mongoose
  .connect(url, mongooseConfig)
  .catch((error) =>
    console.error("Error connecting to MongoDB: ", error.message)
  );

// Listen to MongoDB events
// Learn more: https://mongoosejs.com/docs/connections.html#connection-events
mongoose.connection.on("disconnected", () =>
  console.log(`Disconnected from MongoDB!`)
);

// Listen to any errors while connected to MongoDB
// Learn more: https://mongoosejs.com/docs/connections.html#error-handling
mongoose.connection.on("error", (error) =>
  console.error(`MongoDB connection error: ${error}`)
);

// Export the connection
export default mongoose.connection;
