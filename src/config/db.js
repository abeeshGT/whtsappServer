const mongoose = require('mongoose');

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('Database Connected');
    })
    .catch((error) => console.log(error));
};

module.exports = database;