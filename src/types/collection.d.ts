
export type CollectionMeta<T> = { 
  partitionKey: string,
  seedData: T;
};

export type CollectionList = { 
  [collection: string]: CollectionMeta<unknown[]>
};

export type DbMeta = { 
  [db: string]: CollectionList
};