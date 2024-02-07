export type CollectionMeta<T> = { 
  [collection: string]: T
};

export type DbMeta = { 
  [db: string]: CollectionMeta<unknown>
};