import { ForbiddenError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getAuthenticatedUser } from "../../authLogic";
import { JWT_SECRET } from "../../config";
const CreateUserQuery = require("../../database/queries/user/CreateUser");
const GetUserQuery = require("../../database/queries/user/getUser");
const GetUserByEmailQuery = require("../../database/queries/user/getUserByEmail");
const CreateFavoriteCatPicQuery = require("../../database/queries/user/createFavoriteCatPic");

export const resolvers = {
  Query: {
    user(_, { userId }, ctx) {
      return getAuthenticatedUser(ctx).then(currentUser => {
        if (currentUser.id !== userId) {
          throw new ForbiddenError("Unauthorized");
        }
        return GetUserQuery(userId)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("mongo error", err);
          });
      });
    }
  },
  Mutation: {
    signup(_, { email, password }, ctx) {
      // find user by email
      return GetUserByEmailQuery(email).then(existing => {
        // don't create user if already exist
        if (!existing) {
          // hash password and create user
          return bcrypt
            .hash(password, 10)
            .then(hash => {
              // new user object with hash password
              let newUser = {
                email,
                password: hash,
                jwtVersion: 1
              };
              return CreateUserQuery(newUser).then(data => {
                return data;
              });
            })
            .then(user => {
              const { id, jwtVersion } = user;
              const token = jwt.sign(
                { id, email, version: jwtVersion },
                JWT_SECRET
              );
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              return user;
            });
        }
        return Promise.reject("email already exists"); // email already exists
      });
    },
    login(_, { email, password }, ctx) {
      // console.log("ctx for login", ctx);
      // find user by email
      return GetUserByEmailQuery(email).then(user => {
        if (user) {
          // validate password
          return bcrypt.compare(password, user.password).then(res => {
            if (res) {
              // create jwt
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email,
                  version: user.jwtVersion
                },
                JWT_SECRET
              );
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              return user;
            }
            return Promise.reject("password incorrec t");
          });
        }
        return Promise.reject("email not found");
      });
    },
    addFavoriteCatPic(_, { url }, ctx) {
      // need logic for making sure the person creating the message is the same as the logged in usr
      return getAuthenticatedUser(ctx).then(currentUser => {
        //
        return CreateFavoriteCatPicQuery({ userID: currentUser.id, url })
          .then(data => {
            // publish the message to our pupsub
            return data;
          })
          .catch(err => {
            console.log("mongo error", err);
            return err;
          });
        //
      });
    }
  }
};
