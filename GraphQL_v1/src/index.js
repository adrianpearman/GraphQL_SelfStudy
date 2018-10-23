import { GraphQLServer } from 'graphql-yoga' 

// Five Scalar Types of GraphQL
// String! - expects a numnber
// Boolean - true/false
// Int - whoole number
// Float - number with decimals
// ID - 
// ! - means it it's required

// demo user data
const users = [
  {
    id: '1',
    name: 'Adrian',
    age: 27,
    employed: false,
  },
  {
    id: '2',
    name: 'Kelsey',
    age: 25,
    employed: false,
  },
  {
    id: '3',
    name: 'Mackenzie',
    age: 18,
    employed: false,
  },
  {
    id: '4',
    name: 'Terry',
    age: 56,
    employed: false,
  },
]

const blogPosts = [
  {
    id: '1',
    title: 'Post #1',
    body: '',
    published: true,
    inStores: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post #2',
    body: 'more information',
    published: true,
    inStores: true,
    author: '1'
  },
  {
    id: '3',
    title: 'Post #3',
    body: 'information',
    published: true,
    inStores: true,
    author: '2'
  },
  {
    id: '4',
    title: 'Post #4',
    body: 'all information',
    published: true,
    inStores: true,
    author: '1'
  },
]

const blogComments = [
  {
    id: '1',
    text: 'Comment #1',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'Comment #2',
    author: '1',
    post: '3'
  },
  {
    id: '3',
    text: 'Comment #3',
    author: '3',
    post: '2'
  },
  {
    id: '4',
    text: 'Comment #4',
    author: '3',
    post: '1'
  },
]
// type definitions
const typeDefs = `
  type Query{
    me: User!
    product: Product!
    post: Post!
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    addArray(numbers: [Float!]!): Float! 
    grades: [Int!]!
    users(query: String): [User]! 
    posts(query: String): [Post]!
    comments(query: String): [Comment]!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Product{
    title: String!
    price: Float!
    releaseYear: Int!
    rating: Float
    inStock: Boolean!
  }

  type Post{
    id: ID!
    title: String!
    body: String
    published: Boolean!
    inStores: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment{
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`
// type AboutMe {
//   hello: String!
//   location: String!
//   bio: String!
// }




// resolvers

// information that is passed into resolver variables
// 1. Parent - used for relational information
// Args - contains the supplie arguments
// Context - used for contexual information. log in credentials
// Info

const resolvers = {
  Query: {
    me(){
      return{
        id: 'QWERTY12345',
        name: 'Adrian Pearman',
        age: 27,
        employed: true,
        gpa: null
      }
    },
    post(){
      return{
        id: 'QWERTY12345',
        title: 'How to be a developer',
        body: 'content',
        published: 2018,
        inStores: true
      }
    },
    product(){
      return{
        title: 'Cheerios',
        price: 34.54,
        releaseYear: 2009,
        rating: null,
        inStock:  true ,
      }
    },
    greeting(parent, args, ctx, info){
      if(args.name && args.position){
        return `Hello ${args.name}, the ${args.position}`
      } else if(args.name){
        return `Hello ${args.name}`
      } else {
        return 'Greetings '
      }
    },
    add(parent, args, ctx, info){
      if(args.a && args.b){
        return args.a + args.b
      }
    },
    addArray(parent, args, ctx, info){
      if(args.numbers.length === 0){
        return 0
      } 
      
      return args.numbers.reduce((accumilator, currentValue) => {
        return accumilator + currentValue
      })
    },
    grades(parent, args, ctz, info){
      return [99,23,45,87,65]
    },
    users(parent, args, ctx, info){
      if(!args.query){
         return users 
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info){
      if(!args.query){
        return blogPosts
      }

      return blogPosts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info){
      return blogComments
    }
    // hello(){
    //   return 'This is my first query'
    // },
    // location(){
    //   return 'Toronto, Ontario'
    // },
    // bio(){
    //   return 'I am a web developer'
    // },
    // id(){
    //   return 'QWERTY12345'
    // },
    // name(){
    //   return 'Adrian Pearman'
    // },
    // age(){
    //   return '27'
    // },
    // employed(){
    //   return true
    // },
    // gpa(){
    //   return null
    // },
    // title(){
    //   return 'Foods'
    // },
    // price(){
    //   return 34.54
    // },
    // releaseYear(){
    //   return 2009
    // },
    // rating(){
    //   return null
    // },
    // inStock(){
    //   return true
    // },
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info){
      return blogComments.filter((comment) => {
        return comment.post === parent.id 
      })
    }
  },
  Comment:{
    author(parent, args, ctx, info){
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info){
      return blogPosts.find((post) => {
        return post.id === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info){
      return blogPosts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info){
      return blogComments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.start(() => {
  console.log('the server is running')
})
