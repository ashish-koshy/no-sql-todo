import { env } from './env';
import { cosmos } from './db/cosmos';

import * as fs from 'fs-extra';

(async () => {
    try {
        const dbName = env['DB_NAME'];
        const collection = 'returns';
        const cosmosDb = await cosmos.getDb(dbName);

        /** Run the following block to seed your Cosmos DB */
        // await cosmos.drop(dbName);
        // await cosmos.build(dbName);
        // const jsonPath = './input/tax.json';
        // const linesPerWrite = parseInt(env['COSMOS_BULK_LINES_PER_WRITE']) || 60;
        // cosmos.importFromJsonFile(cosmosDb, jsonPath, collection, linesPerWrite);

        /** 
         * Seed your data base with the commented code block above at least once 
         * before performing the query below 
         **/
        const records = await cosmosDb?.container(collection);
        const querySpec = {
            query: 'SELECT * FROM returns WHERE returns.WorkId = @id',
            parameters: [
              {
                name: '@id',
                value: 'f122423b-ceeb-4e33-ac4a-84376f571c5b'
              }
            ]
        };
        const response = await records?.items.query(querySpec).fetchAll();
        response?.resources?.length && console.log(response.resources.pop());

    } catch (e) {
        console.error(e);
    }
})();
