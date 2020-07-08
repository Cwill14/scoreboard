const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} = graphql;

const Game = require('../models/game');
const User = require('../models/user');

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: GraphQLID },
        homeScore: { type: GraphQLInt },
        awayScore: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args) {
                // return users.find(user => user.id == parent.userId)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        games: {
            type: new GraphQLList(GameType),
            resolve(parent, args) {
                // return games.filter(game => game.userId == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        game: {
            type: GameType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db/other source
                // return games.find(game => game.id == args.id);
            }
        },
        games: {
            type: GraphQLList(GameType),
            resolve(parent, args) {
                // return games
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return users.find(user => user.id == args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                // return users
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve(parents, args) {
                let user = new User({
                    username: args.username,
                    password: args.password,
                    email: args.email
                })
                return user.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})