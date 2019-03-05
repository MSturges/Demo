require("dotenv").config();
import { ApolloServer, AuthenticationError } from "apollo-server";
const mongoose = require("mongoose");
import jwt from "express-jwt";

const schema = require("./schema");
import { JWT_SECRET } from "./config";
import GetUserQuery from "./database/queries/user/getUser";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

const PORT = 8080;
const server = new ApolloServer({
  // An object or function called with the current request that creates the context shared across all resolvers
  context: ({ req, res }) => {
    // The express-jwt middleware checks our Authorization Header for a Bearer token,
    // decodes the token using the JWT_SECRET into a JSON object, and then attaches
    // that Object to the request as req.user
    const user = new Promise((resolve, reject) => {
      jwt({
        secret: JWT_SECRET,
        // Note that by setting credentialsRequired: false, we allow non-authenticated requests to pass through the middleware.
        // This is required so we can allow signup and login requests (and others) through the endpoint.
        credentialsRequired: false
      })(req, res, e => {
        if (req.user) {
          resolve(GetUserQuery(req.user.id));
        } else {
          resolve(null);
        }
      });
    });
    return {
      user
    };
  },
  ...schema
});

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
