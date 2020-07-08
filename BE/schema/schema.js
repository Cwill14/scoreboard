const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
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
                return User.findById(parent.userId)
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
                return Game.find({ userId: parent.id })
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
                return Game.findById(args.id)
            }
        },
        games: {
            type: GraphQLList(GameType),
            resolve(parent, args) {
                // return games
                return Game.find({})
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return users.find(user => user.id == args.id)
                return User.findById(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                // return users
                return User.find({})
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
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    password: args.password,
                    email: args.email
                })
                return user.save()
            }
        },
        addGame: {
            type: GameType,
            args: {
                homeScore: {type: new GraphQLNonNull(GraphQLInt)},
                awayScore: {type: new GraphQLNonNull(GraphQLInt)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let game = new Game({
                    homeScore: args.homeScore,
                    awayScore: args.awayScore,
                    userId: args.userId
                });
                return game.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})