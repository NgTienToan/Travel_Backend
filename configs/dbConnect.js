const mongoose = require('mongoose');

module.exports = {
    databaseConnection: function() {
      mongoose
        .connect(`mongodb+srv://ducminh:VKhEXIfIfS3qGgWe@cluster0-oajkt.mongodb.net/Travel?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err.message));
    }
  };