const database = require("../database");
const services = {};

const collection = "gifs";

services.addGif = ({ id }, callback) => {
  const inputData = { id, type: "gif" };
  database.collection(collection).insertOne(inputData, callback);
};

services.gif = callback =>
  database
    .collection(collection)
    .find({})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const gif = result[Math.floor(Math.random() * result.length)];
      callback(null, gif);
    });

services.deleteGif = ({ animation }, callback) => {
  database
    .collection(collection)
    .deleteOne({ id: animation.file_id }, (err, result) => {
      if (err) throw err;
      if (result.deletedCount > 0) return callback(null, true);
    });
};

services.deleteAllGifs = callback =>
  database.collection(collection).deleteMany({}, (err, result) => {
    if (err) throw err;
    if (result.deletedCount > 0) callback(null, true);
  });

module.exports = services;
