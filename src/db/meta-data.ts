import { DbMeta } from '../types/zeus/collection';
import { ZeusCollection } from '../types/zeus';

/** This fake data was generated using GPT-4 */
const zeusCollectionMeta: ZeusCollection = {
  supplier: [
    {
      id: '1',
      name: 'TechMaster Electronics',
      contact: {
        name: 'John Smith',
        email: 'john@techmaster.com',
        phone: '123-456-7890'
      },
      address: {
        street: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001'
      }
    },
    {
      id: '2',
      name: 'GadgetX Technologies',
      contact: {
        name: 'Jane Doe',
        email: 'jane@gadgetx.com',
        phone: '987-654-3210'
      },
      address: {
        street: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601'
      }
    },
    {
      id: '3',
      name: 'FitFoot Sports',
      contact: {
        name: 'Bob Johnson',
        email: 'bob@fitfoot.com',
        phone: '555-123-4567'
      },
      address: {
        street: '101 Pine St',
        city: 'Miami',
        state: 'FL',
        zip: '33101'
      }
    }
  ],
  customer: [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      age: 30,
      address: {
        street: '123 Maple Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      age: 25,
      address: {
        street: '456 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001'
      }
    }
  ],
  product:[
    {
      id: '1',
      product_name: 'Laptop',
      brand: 'TechMaster',
      category: 'Electronics',
      price: 999.99,
      description: 'A powerful laptop with high-resolution display and fast processor.'
    },
    {
      id: '2',
      product_name: 'Smartphone',
      brand: 'GadgetX',
      category: 'Electronics',
      price: 699.95,
      description: 'The latest smartphone with a stunning camera and long battery life.'
    },
    {
      id: '3',
      product_name: 'Tablet',
      brand: 'TechZone',
      category: 'Electronics',
      price: 349.99,
      description: 'A lightweight tablet with a vibrant screen and expandable storage.'
    }
  ],
  batch: [
    {
      id: '1',
      batch_number: 'BATCH001',
      product_name: 'Laptop',
      manufacturing_date: '2024-02-10',
      expiry_date: '2025-02-10',
      quantity: 100
    },
    {
      id: '2',
      batch_number: 'BATCH002',
      product_name: 'Smartphone',
      manufacturing_date: '2024-02-12',
      expiry_date: '2025-02-12',
      quantity: 150
    }
  ],
  stock: [
    {
      id: '1',
      product_name: 'Laptop',
      batch_number: 'BATCH001',
      in_stock_quantity: 80
    },
    {
      id: '2',
      product_name: 'Laptop',
      batch_number: 'BATCH002',
      in_stock_quantity: 90
    },
    {
      id: '3',
      product_name: 'Smartphone',
      batch_number: 'BATCH001',
      in_stock_quantity: 120
    }
  ],
  purchase: [
    {
      id: '1',
      customer_name: 'Alice Smith',
      customer_email: 'alice@example.com',
      product_name: 'Laptop',
      batch_number: 'BATCH001',
      purchase_date: '2024-02-20',
      quantity_purchased: 2
    },
    {
      id: '2',
      customer_name: 'Bob Johnson',
      customer_email: 'bob@example.com',
      product_name: 'Smartphone',
      batch_number: 'BATCH002',
      purchase_date: '2024-02-22',
      quantity_purchased: 3
    },
    {
      id: '3',
      customer_name: 'Alice Smith',
      customer_email: 'alice@example.com',
      product_name: 'Tablet',
      batch_number: 'BATCH003',
      purchase_date: '2024-02-25',
      quantity_purchased: 1
    },
    {
      id: '4',
      customer_name: 'Charlie Brown',
      customer_email: 'charlie@example.com',
      product_name: 'Laptop',
      batch_number: 'BATCH002',
      purchase_date: '2024-02-26',
      quantity_purchased: 1
    }
  ],
  test: [
    {
      id: '1',
      test: 'Sample text'
    }
  ]
};

const dbMeta: DbMeta = {
  'zeus': zeusCollectionMeta
}

/** 
 * Primarity used to retain: 
 * - Collection structure 
 * - Seed data 
 **/
export const getDbMeta = (dbName: string) => dbMeta[dbName];