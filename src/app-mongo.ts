import { env } from './env';
import { mongo } from './db/mongo';

(async () => {
    try {
        const dbName = env['DB_NAME'];
        const collection = 'return';

        const mongoDb = await mongo.getDb(dbName);

        // await mongo.drop(dbName);
        // await mongo.build(dbName);
        // const jsonPath = './input/WC-Returns.json';
        // mongo.importFromJsonFile(mongoDb, jsonPath, collection);

        const records = await mongoDb?.collection(collection);
        const query = { id: '527002BA-3EEF-4CB4-9671-C3AF61E46D52' }
        const record = await records?.findOne(query);
        if (record) console.log(record);

    } catch (e) {
        console.error(e);
    } finally {
        await mongo.close();
    }
})();
