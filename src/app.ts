import { env } from './env';
import { mongo } from './db/mongo';

(async () => {
    try {
        const dbName = env['DB_NAME']
        const db = await mongo.getDb(dbName);

        const customer = 'customer';
        const customerCollection = await db?.collection(customer);
        console.log(await customerCollection?.findOne({ email: 'bob@example.com' }));

    } catch (e) {
        console.error(e);
    } finally {
        await mongo.close();
    }
})();
