export type Supplier = {
    supplierId: string,
    name: string,
    contact: {
        name: string,
        email: string,
        phone: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        zip: string
    }
};

