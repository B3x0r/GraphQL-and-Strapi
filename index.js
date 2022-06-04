var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema, assertInputType } = require("graphql");

// Construct a schema, using GraphQL schema language
var gameCatalogue = [
  {
    id: 1,
    title: "Game B",
    publisher: "Publisher ABC",
    developer: "Developer DEF",
    releaseDate: "2015-01-01",
    platforms: [
      { id: 1, name: "Xbox" },
      { id: 2, name: "Playstation" },
      { id: 3, name: "PC" }
    ],
    esrbRating: {
      id: 1,
      code: "E",
      name: "Everyone"
    },
  },
  {
    id: 2,
    title: "Game C",
    publisher: "Publisher ABC",
    developer: "Developer DEF",
    releaseDate: "2018-01-01",
    platforms: [
      { id: 1, name: "Xbox" },
      { id: 3, name: "PC" }
    ],
    esrbRating: {
      id: 1,
      code: "E",
      name: "Everyone"
    },
  },
  {
    id: 3,
    title: "Game A",
    publisher: "Publisher ABC",
    developer: "Developer DEF",
    releaseDate: "2020-01-01",
    platforms: [
      { id: 1, name: "Xbox" },
      { id: 3, name: "PC" }
    ],
    esrbRating: {
      id: 2,
      code: "M",
      name: "Mature"
    },
  },
];
//construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
  games: [Game],
  esrbRating: [EsrbRating]
},
type Game {
  title: String
  publisher: String
  esrbRating: {
    id: Int,
    code: String,
    name: String
  } 
 }

`);
// The root provides a resolver function for each API endpoint

var root = {
  games: () => gameCatalogue,
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a Graphql API server at http://localhost:4000/graphql");
