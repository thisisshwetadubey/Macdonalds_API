const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //takes only one parameter
    console.log(
      `Database Connected ✅ ${conn.connection.host}`.black.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1); //method
  }
};

module.exports = connectDB;
