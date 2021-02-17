const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

let links = [{
    id: "link-0",
    description: "This is the first link",
    url: "https://google.com"
}]
let idCount = links.length

// 2
const resolvers = {
    Query: {
        link: (parent, args) => links[args]

    },
    Mutation: {

        updateLink: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return links
        },
        deleteLink: (parent, args) => {
            const link = links.filter((x) => x.id == args)
            list.splice(links.map(x => { return x.id }).indexOf(args))

            return link
        }
    }

}


// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'exercise.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );