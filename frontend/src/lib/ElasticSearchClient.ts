import { Client } from '@elastic/elasticsearch';

const BASE_URL = process.env.NEXT_PUBLIC_ELASTICSEARCH_URL;
const PASSWORD = process.env.NEXT_PUBLIC_ELASTICSEARCH_PASSWORD;

export const esClient = new Client({
    node: BASE_URL,
    auth: {
        username: 'elastic',
        password: PASSWORD || ''
    }
});
