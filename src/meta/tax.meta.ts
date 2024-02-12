import { CollectionList, CollectionMeta } from '../types/collection';
import { Return } from '../types/tax/return';
import { v4 as uuidv4 } from 'uuid';

const returns: CollectionMeta<Return[]> = {
    partitionKey: 'WorkId',
    seedData: [
        {
            WorkId : uuidv4(),
            FirstName : 'Jane',
            LastName : 'Doe',
            PhoneNumber : '0000000000',
            EmailAddress : 'janeDoe@abc.com'
        },
    ],
};

export const taxMeta: CollectionList = {
    returns
};