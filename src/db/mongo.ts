import { env } from '../env';
import { getDbMeta } from './meta-data';
import { MongoClient, Db, OptionalId } from 'mongodb';

export const mongo = {
    getClient :(
        dbUrl: string = env['MONGO_URL']
    ): MongoClient => {
        return new MongoClient(dbUrl);
    },
    getConnection : async (): Promise<MongoClient | undefined> => {
        try {
            return await mongo.getClient()?.connect();
        } catch {
            return undefined;
        }
    },
    getDb: async(
        dbName: string = env['DB_NAME']
    ): Promise<Db | undefined> => {
        try {
            if (!dbName) return;
            return (await mongo.getConnection())?.db(dbName);
        } catch {
            return undefined;
        }
    },
    getAllCollections: async(
        db: Db | undefined
    ) => {
        try {
            const $collections = db?.listCollections();
            const collections = (await $collections?.toArray()) || [];
            return collections
                    .filter((collection) => collection?.name !== undefined)
                    .map((index) => index?.name);
        } catch {
            return [];
        }
    },
    dropAllCollections: async(
        db: Db | undefined
    ) => {
        try {
            const collections = await mongo.getAllCollections(db);
            for (const collection of collections) {
                const dropped = (await db?.dropCollection(collection));
                console.log('Collection', collection, 'dropped');
            }
        } catch(e) {
            console.error(e);
        } finally {
            await mongo.close();
        }
    },
    drop: async(
        dbName: string = env['DB_NAME']
    ) => {
        try {
            const db = await mongo.getDb(dbName);
            await mongo.dropAllCollections(db);
        } catch(e) {
            console.error(e);
        } finally {
            await mongo.close();
        }
    },
    build: async(
        dbName: string = env['DB_NAME']
    ) => {
        try {
            const db = await mongo.getDb(dbName);
            const collectionList = await mongo.getAllCollections(db);
            for (const collection in getDbMeta(dbName)) {
                if (!collectionList.includes(collection)) {
                    await db?.createCollection(collection);
                    console.log('Collection', `'${collection}'`, 'created');
                    await mongo?.seed(db, collection);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            await mongo.close();
        } 
    },
    seed: async(
        db: Db | undefined,
        collection: string
    ) => {
        try {
            const dbName = db?.databaseName || '';
            if (!dbName) return
    
            const seedData = (getDbMeta(dbName) || {})[collection] as OptionalId<Document[]> | undefined;
            if (!seedData) return
    
            await db?.collection(collection).insertMany(seedData);
            console.log('Collection', `'${collection}'`, 'seeded');
        } catch (e) {
            console.error(e);
        } finally {
            await mongo.close();
        }
    },
    close: async() => {
        await mongo.getClient()?.close()
            .catch(e => console.error(e))
            .finally(() => console.log('Connection closed...'));
    }
};
