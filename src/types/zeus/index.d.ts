import { Supplier } from './supplier';
import { Customer } from './customer';
import { Product } from './product';
import { Batch } from './batch';
import { Stock } from './stock';
import { Purchase } from './purchase';
import { Test } from './test';
import { CollectionMeta } from '../collection';

export type ZeusCollection = { 
    supplier: CollectionMeta<Supplier[]>,
    customer: Customer[],
    product: Product[],
    batch: Batch[],
    stock: Stock[],
    purchase: Purchase[],
    test: Test[],
};