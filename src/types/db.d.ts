import { CollectionMeta } from "./zeus/collection";

/** 
 * Generic Type to interface with various 
 * database technologies like 
 * Cosmos, Mongo etc.
 **/
export type GenericDb = { 
    build: ((dbName: string) => Promise<void>),
    drop: ((dbName: string) => Promise<void>),
};