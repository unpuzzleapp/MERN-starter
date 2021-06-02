const mongoose = require("mongoose");

class DatabaseConfig {
  connect = (url) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .then(() => {
          __logger.info("Database connected successfully!");
          resolve();
        })
        .catch((err) => {
          __logger.error("Failed to connect Database!");
          reject(err);
        });
    });
  };

  disconnect = () => {
    mongoose.connection.close();
  };
}
module.exports = new DatabaseConfig();
