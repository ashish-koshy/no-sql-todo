import { env } from './env';
import { mongo } from './db/mongo';
import { cosmos } from './db/cosmos';

(async () => {
    try {
        const dbName = env['DB_NAME'];

        const collection = 'return';
        const cosmosDb = await cosmos.getDb(dbName);

        await cosmos.drop(dbName);
        await cosmos.build(dbName);
        const jsonPath = './input/WC-Returns.json';
        cosmos.importFromJsonFile(cosmosDb, jsonPath, collection);

        // const records = await cosmosDb?.container(collection);
        // const querySpec = {
        //     query: 'SELECT * FROM return WHERE return.TaxReturnGuid = @TaxReturnGuid',
        //     parameters: [
        //       {
        //         name: '@TaxReturnGuid',
        //         value: '527002BA-3EEF-4CB4-9671-C3AF61E46D52'
        //       }
        //     ]
        // };
        // const response = await records?.items.query(querySpec).fetchAll();
        // response?.resources?.length && console.log(response.resources.pop());

    } catch (e) {
        console.error(e);
    } finally {
        await mongo.close();
    }
})();
