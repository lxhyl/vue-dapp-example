import { createClient } from '@urql/vue';

const client = createClient({
    url: 'http://localhost:3000/graphql',
});

