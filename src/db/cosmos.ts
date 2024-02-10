import { env } from '../env';
import { CosmosClient, CreateOperationInput, Database, OperationInput } from '@azure/cosmos';
import { getDbMeta } from '../meta';

import * as fs from 'fs-extra';
import * as readline from 'readline';

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
            return db?.id ? Object.keys(getDbMeta(db.id)) : [];
        } catch(err) {
            console.log(err);
            return [];
        }
    },
    bulk: async(
        db: Database | undefined,
        collection: string,
        operations: OperationInput[],
    ) => {
        try {
            const response = await db?.container(`${collection}`).items.bulk(operations);   
            console.log(response?.length ? response[0] : '')
            response?.length &&
                console.log(
                    'Bulk operation', 
                    `'${collection}'`, 
                    '|', 'Status', 
                    response[0]?.statusCode || 'n/a'
                );
        } catch(e) {
            console.error(e);
        }
    },
    drop: async (
        dbName: string = env['DB_NAME']
    ): Promise<void> => {
        try {
            const db = await cosmos.getDb(dbName);
            const collections = await cosmos.getAllCollections(db);
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
    
            const meta = (getDbMeta(dbName) || {})[collection];
            if (!meta) return
    
            const operations = meta?.seedData?.map(
                resourceBody => {
                    return {
                        partitionKey: meta?.partitionKey || '',
                        operationType: 'Create',
                        resourceBody,
                    } as CreateOperationInput
                }
            );
            console.log('\nWrite ready :', JSON.stringify(operations));
            await cosmos.bulk(db, collection, operations);
        } catch (err: any) {
            console.log(err);
        }
    },
    build: async(
        dbName: string = env['DB_NAME']
    ): Promise<void> => {
        try {
            const db = await cosmos.getDb(dbName);

            const collections = (getDbMeta(dbName) || {});
            for (const collection in collections) {
                const response = await db?.containers.createIfNotExists({
                    id: collection,
                    partitionKey: `/${collections[collection]?.partitionKey}` || '',
                });
                console.log(
                    'Create collection', 
                    `'${collection}'`, 
                    '|', 'Status', 
                    response?.statusCode || 'n/a'
                );
                `${response?.statusCode}`.startsWith('2') 
                    && (await cosmos?.seed(db, collection));
            }
        } catch (err: any) {
            console.log(err);
        }
    },
    importFromJsonFile: (
        db: Database | undefined,
        jsonPath: string, 
        collection: string,
        partitionKey = 'id',
        linesPerWrite = 50,
    ) => {
        const readStream = fs.createReadStream(jsonPath, 'utf-8');
        const readLine = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
        });

        let isFirstLine = true;
        let operations: CreateOperationInput[] = [];

        readLine.on('line', async (line) => {
            if (isFirstLine) {
              isFirstLine = false;
              return;
            }
          
            if (line.trim() === ']') return;
            const sanitizedLine = line.replace(/,\s*$/, '').trim();
          
            try {
                operations.push(
                    {
                        partitionKey,
                        operationType: 'Create',
                        resourceBody: JSON.parse(sanitizedLine),
                    }
                );
                if (operations.length >= linesPerWrite) {
                    readLine.pause();
                    console.log('\nWrite ready :', JSON.stringify(operations.splice(0, linesPerWrite)));
                    // await cosmos.bulk(db, collection, operations.splice(0, linesPerWrite), true);
                    readLine.resume();
                }
            } catch (err) {
              console.error('Error parsing JSON:', err);
            }
        });

        readLine.on('close', async() => {
            if (operations.length)
                console.log('\nWrite ready :', JSON.stringify(operations.splice(0, linesPerWrite)));
            // await cosmos.bulk(db, collection, operations.splice(0, linesPerWrite));
        });

        readStream.on('error', (error) => {
            console.error('Error reading the file:', error)
        });
    },
};
