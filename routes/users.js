var express = require('express');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const connectionUri = "mongodb://localhost:27017/LocalLoginProject";
mongoose.connect(connectionUri);

const UserSchema = mongoose.Schema({
  "username" : String,
  "password" : String,
  "secret"  : String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);