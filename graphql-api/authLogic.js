import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from "apollo-server";

// reusable function to check for a user with context
export const getAuthenticatedUser = function(ctx) {
  return ctx.user.then(user => {
    if (!user) {
      throw new AuthenticationError("Unauthenticated");
    }
    return user;
  });
};
