import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from "express-graphql";
import cors from "cors";
import mongoose from 'mongoose';
import graphQLSchema from './graphql/schema';
import graphQLResolvers from './graphql/resolvers';
require('dotenv').config();

const app = express();

app.use(
    cors(),
    bodyParser.json()
)

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

function main() {
    const port = process.env.PORT || 5000;
    // const URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135852.mlab.com:35852/mern-graphql-jwt`;
    const URI ='mongodb+srv://lambdaReadWriteUser:deepthi@cluster0.c0bd4.mongodb.net/mern-graphql-jwt?retryWrites=true&w=majority'
    mongoose.connect(URI, { useNewUrlParser: true })
        .then(() => {
            app.listen(5000, () => console.log(`Server is listening on port `));
        })
        .catch(err => {
            console.log(err);
        })
}

main();