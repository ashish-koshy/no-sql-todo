import { CollectionList, CollectionMeta } from '../types/collection';
import { Return } from '../types/tax/return';
import { v4 as uuidv4 } from 'uuid';

const returns: CollectionMeta<Return[]> = {
    partitionKey: 'TaxProId',
    seedData: [
        {
            TaxProId : '1',
            WorkFlowId : uuidv4(),
            id : uuidv4(),
            OfficeId : '00000',
            FirstName : 'Jane',
            LastName : 'Doe',
            PhoneNumber : '0000000000',
            EmailAddress : 'janeDoe@abc.com',
            StatusId : 'NULL',
            TypeId : 'NULL',
            Ucid : 'NULL',
        },
    ],
};

export const taxMeta: CollectionList = {
    returns
};