import { env } from './env';
import { mongo } from './db/mongo';
import { cosmos } from './db/cosmos';

(async () => {
    try {
        const dbName = env['DB_NAME'];

        const customer = 'customer';
        const mongoDb = await mongo.getDb(dbName);

        const mongoCustomerCollection = await mongoDb?.collection(customer);
        console.log(await mongoCustomerCollection?.findOne({ email: 'bob@example.com' }));

        const cosmosDb = await cosmos.getDb(dbName);
        const cosmosCustomerCollection = await cosmosDb?.container(customer);
        const querySpec = {
            query: 'SELECT * FROM customer WHERE customer.email = @email',
            parameters: [
              {
                name: '@email',
                value: 'alice@example.com'
              }
            ]
        };
        const response = await cosmosCustomerCollection?.items.query(querySpec).fetchAll();
        response?.resources?.length && console.log(response.resources.pop());

    } catch (e) {
        console.error(e);
    } finally {
        await mongo.close();
    }
})();
