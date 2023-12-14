import {ApolloClient, InMemoryCache} from '@apollo/client';

const graphQLProvider = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export default graphQLProvider;
