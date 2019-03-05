const { importSchema } = require("graphql-import");
const merge = require("lodash/merge");

// normally we would have more than one resolver, keeping for now if additonaly resolvers are needed.
const RootResolvers = merge(require("./User/resolvers").resolvers);

module.exports = {
  typeDefs: importSchema("./schema/rootSchema.graphql"),
  resolvers: RootResolvers,
  formatError: error => {
    console.log("server error...index.js", error);
    return error;
  },
  formatResponse: response => {
    return response;
  }
};
