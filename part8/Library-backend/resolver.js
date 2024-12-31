const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
const Books = require('./models/book')
const Authors = require('./models/author')
const Users = require('./models/user')
const { GraphQLError } = require('graphql')
const resolvers = {
    Query: {
      bookCount: async () => Books.collection.countDocuments(),
      authorsCount: async () => Authors.collection.countDocuments(),
      allBooks: async (root, args) => {
        let filter = {}
        if (args.author) {
          const author = await Authors.findOne({ name: args.author })
          if (author) {
            filter.author = author._id
          }
          else {
            return []
          }
        }

        if (args.genre) {
          filter.genres = args.genre
        }
        return Books.find(filter).populate('author')
      },
      allAuthors: async () => {
        return Authors.find({})
      },
      me:  (root, args, context) => {
        return context.currentUser
      }
    },

    Author: {
      bookCount: async (root) => {
        return Books.countDocuments({ author: root._id })
      }
    },

    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let authorRegistration = await Authors.findOne({ name: args.author })

                  if (!authorRegistration) {
                    authorRegistration = new Authors({ name: args.author, bookCount: 1 })
                    try {
                      await authorRegistration.save()
                    } catch (error) {
                      throw new UserInputError("Error: "+ error.message, {
                        invalidArgs: args,
                      })
                    }
                  } else {
                    authorRegistration.bookCount += 1
                    await authorRegistration.save()
                  }

          const bookToAdd = new Books({ ...args, author: authorRegistration })

        try {
          await bookToAdd.save()
        } catch (error) {
          throw new GraphQLError('Adding a new book failed' + error.message, {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args,  error }
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: bookToAdd })
        return bookToAdd
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        const authorToEdit = await Authors.findOne({ name: args.name })
        if (!authorToEdit) return null
        authorToEdit.born = args.born
        try {
          await authorToEdit.save()
        } catch (error) {
          throw new GraphQLError('Updating the author failed', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
          })
        }
        return authorToEdit
      },

      createUser: async (root, args) => {
        const user = new Users({ username: args.username, favoriteGenre: args.favoriteGenre })
        try {
         const savedUser =  await user.save()
         return savedUser
        } catch (error) {
          throw new GraphQLError('Creating a new user failed', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error }
          })
        }
        },

        login: async (root, args) => {
          const user =  await Users.findOne({ username: args.username })
          if ( !user || args.password !== 'admin' ) {
            throw new GraphQLError('wrong credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }

          const userForToken = {
            username: user.username,
            id: user._id,
          }

          return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}
        },
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
      },
  }

  module.exports = resolvers
