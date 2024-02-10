export type Customer = {
    customerId: string,
    name: string,
    email: string,
    age: number,
    address: {
      street: string,
      city: string,
      state: string,
      zip: string
    }
};