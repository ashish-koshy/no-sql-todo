
import { DbMeta } from '../types/collection';
import { taxMeta } from './tax.meta';
import { zeusMeta } from './zeus.meta';

export const dbMeta: DbMeta = {
    'zeus': zeusMeta,
    'tax': taxMeta,
}
  
/** 
 * Primarity used to retain: 
 * - Collection structure 
 * - Seed data 
 **/
export const getDbMeta = (dbName: string) => dbMeta[dbName];