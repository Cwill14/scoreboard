const express = require('express')
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const server = express();

server.use(cors());

mongoose
 .connect(
  "mongodb+srv://ScoreboardAdmin:Scoreboard123@scoreboard-8kkv9.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
 )
 .then(() => console.log("Connected to MongoDB Atlas"))
 .catch(err => console.log("Error: ", err.message));

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

module.exports = server;