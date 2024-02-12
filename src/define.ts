import { getDbMeta } from './meta';
import { mongo } from './db/mongo';
import { cosmos } from './db/cosmos';
import { GenericDb } from './types/db';

const getDbServer = (
    dbServer: string
): GenericDb | undefined => {
    switch (dbServer) {
        case 'mongo':
            return mongo;
        case 'cosmos':
            return cosmos;
        default:
            return;
    } 
}

const triggerOperations = async(
    dbServer: GenericDb,
    dbName: string,
    action: string, 
) => {
    switch (action) {
        case 'drop':
            await dbServer?.drop(dbName);
            break;
        case 'build':
            await dbServer?.build(dbName);
            break;
        default:
            return;
    }    
}

(async(): Promise<void> => {
    const dbAction = process.argv?.pop() || '';
    if (!dbAction) return;

    let dbName = process.argv?.pop() || '';
    dbName = typeof getDbMeta(dbName) !== undefined ? dbName : ''
    if (!dbName) return;

    const dbServerName = process.argv?.pop() || '';
    const dbServer = getDbServer(dbServerName);
    if (!dbServer) return;

    console.log('Server -', dbServerName);
    console.log('Database -', dbName);
    await triggerOperations(dbServer, dbName, dbAction);
})();