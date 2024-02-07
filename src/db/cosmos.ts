import { env } from '../env';
import { CosmosClient, Database, OperationInput } from '@azure/cosmos';
import { getDbMeta } from './meta-data';

const singleTon: {
    client: CosmosClient | undefined 
} = {
    client: undefined
};

export const cosmos = {
    getClient :(
        key: string = env['COSMOS_KEY'],
        endpoint: string = env['COSMOS_ENDPOINT'],
    ): CosmosClient => {
        if (!singleTon.client) 
            singleTon.client = new CosmosClient({ key, endpoint })
        return singleTon.client;
    },
    getDb: async(
        dbName: string = env['DB_NAME']
    ): Promise<Database | undefined> => {
        try {
            if (!dbName) return;
            return (
                await cosmos
                    .getClient()
                    .databases
                    .createIfNotExists({ id: dbName })
            )?.database;
        } catch {
            return undefined;
        }
    },
    getAllCollections: async(
        db: Database | undefined
    ) => {
        try {
            return [];
        } catch(err) {
            console.log(err);
            return [];
        }
    },
    drop: async (
        dbName: string = env['DB_NAME']
    ): Promise<void> => {
        try {
            const db = await cosmos.getDb(dbName);
            const collections = Object.keys(getDbMeta(dbName));
            for (const collection of collections) {
                const response = await db?.container(collection)?.delete();
                console.log(
                    'Drop collection', 
                    `'${collection}'`, 
                    '|', 'Status', 
                    response?.statusCode || 'n/a'
                );
            }
        } catch(e) {
            console.error(e);
        }
    },
    seed: async(
        db: Database | undefined,
        collection: string
    ) => {
        try {
            const dbName = db?.id || '';
            if (!dbName) return
    
            let seedData = (getDbMeta(dbName) || {})[collection] as unknown[];
            if (!seedData) return
    
            const operations: OperationInput[] = seedData.map(
                resourceBody => {
                    return {
                        operationType: 'Create',
                        resourceBody,
                    } as OperationInput
                }
            );
    
            const bulkOperation 
                = await db?.container(`${collection}`).items.bulk(operations);
    
            const response = bulkOperation?.pop();
            console.log(
                'Seed collection', 
                `'${collection}'`, 
                '|', 'Status', 
                response?.statusCode || 'n/a'
            );
        } catch (err: any) {
            console.log(err);
        }
    },
    build: async(
        dbName: string = env['DB_NAME']
    ): Promise<void> => {
        try {
            const db = await cosmos.getDb(dbName);

            const collections = Object.keys(getDbMeta(dbName));
            for (const collection of collections) {
                const response = await db?.containers.createIfNotExists({
                    id: collection,
                    partitionKey: `/id`,
                });
                console.log(
                    'Create collection', 
                    `'${collection}'`, 
                    '|', 'Status', 
                    response?.statusCode || 'n/a'
                );
                response?.statusCode === 201 
                    && (await cosmos?.seed(db, collection));
            }
        } catch (err: any) {
            console.log(err);
        }
    },
};
