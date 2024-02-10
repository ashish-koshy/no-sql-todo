import { env } from './env';
import { cosmos } from './db/cosmos';

(async () => {
    try {
        const dbName = env['DB_NAME'];
        const cosmosDb = await cosmos.getDb(dbName);

        // await cosmos.drop(dbName);
        await cosmos.build(dbName);

        const collection = 'return';
        const jsonPath = './input/WC-Returns.json';
        // cosmos.importFromJsonFile(cosmosDb, jsonPath, collection, '/');

        // const records = await cosmosDb?.container(collection);
        // const querySpec = {
        //     query: 'SELECT * FROM return WHERE return.id = @id',
        //     parameters: [
        //       {
        //         name: '@id',
        //         value: 'E873173C-3966-4786-A197-8149EAAC7E40'
        //       }
        //     ]
        // };
        // const response = await records?.items.query(querySpec).fetchAll();
        // response?.resources?.length && console.log(response.resources.pop());

    } catch (e) {
        console.error(e);
    }
})();
