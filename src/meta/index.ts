
import { DbMeta } from '../types/collection';
import { taxMeta } from './tax.meta';

export const dbMeta: DbMeta = {
    'tax': taxMeta,
}
  
/** 
 * Primarity used to retain: 
 * - Collection structure 
 * - Seed data 
 **/
export const getDbMeta = (dbName: string) => dbMeta[dbName];